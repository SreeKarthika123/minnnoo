const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");
const pdfParse = require("pdf-parse");
const analyzeResumeVsJob = require("../utils/aiAnalyzeJob");

const User = require("../models/User");
const Vacancy = require("../models/Vacancy");

const {
  textToVector,
  cosineSimilarity,
  keywordScore,
  cleanText
} = require("../utils/atsScoring");



router.get("/dashboard-matches/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    const vacancies = await Vacancy.find(
      { "atsScores.userId": userId },
      { atsScores: 1 }
    );

    let matchCount = 0;

    vacancies.forEach(v => {
      const scoreObj = v.atsScores.find(
        s => String(s.userId) === String(userId)
      );

      if (scoreObj && scoreObj.score >= 32) {
        matchCount++;
      }
    });

    res.json({
      count: matchCount
    });
  } catch (err) {
    console.error("Dashboard ATS match error:", err);
    res.status(500).json({ error: "Failed to compute matches" });
  }
});

/* ===============================
   ANALYZE RESUME VS ALL JOBS
   =============================== */


   const analyzeATSForOne = require("../utils/analyzeATSForOne");

router.post("/analyze-one", async (req, res) => {
  const { userId, vacancyId } = req.body;

  try {
    await analyzeATSForOne(userId, vacancyId);
    res.json({ success: true });
  } catch (err) {
    console.error("ATS analyze-one error:", err);
    res.status(500).json({ error: "ATS failed" });
  }
});

router.post("/analyze-all/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId);
    if (!user?.resume)
      return res.status(400).json({ error: "Resume missing" });

    /* -------- READ RESUME ONCE -------- */
    const resumePath = path.join(__dirname, "../", user.resume);
    const pdf = await pdfParse(fs.readFileSync(resumePath));
    const resumeText = pdf.text.slice(0, 3500);

    const resumeVector = textToVector(resumeText);

    /* -------- FETCH ALL JOBS -------- */
    const vacancies = await Vacancy.find();

    const results = [];

    for (const job of vacancies) {
      const jobText = `
        ${(job.skills || []).join(" ")}
        ${job.jobDescription || ""}
      `;

      const jobVector = textToVector(jobText);

      const keyword = keywordScore(resumeText, jobText);
      const cosine = cosineSimilarity(resumeVector, jobVector);

      /* ---- FINAL ATS SCORE ---- */
      let finalScore =
        0.6 * keyword +
        0.4 * cosine;

      finalScore = Math.round(finalScore * 100);

      /* ---- FLOORING (important) ---- */
      if (finalScore < 15) finalScore = 15;

      results.push({
        vacancyId: job._id,
        title: job.title,
        score: finalScore
      });

      /* ---- SAVE SCORE ---- */
      await Vacancy.updateOne(
        { _id: job._id },
        {
          $pull: { atsScores: { userId } }
        }
      );

      await Vacancy.updateOne(
        { _id: job._id },
        {
          $push: {
            atsScores: {
              userId,
              score: finalScore,
              analyzedAt: new Date()
            }
          }
        }
      );
    }

    /* -------- SORT HIGH → LOW -------- */
    results.sort((a, b) => b.score - a.score);

    await User.updateOne(
  { _id: userId },
  { $set: { atsAnalyzed: true } }
);


    const AI_THRESHOLD = 32;
const MAX_AI_JOBS = 3;

const topJobsForAI = results
  .filter(r => r.score >= AI_THRESHOLD)
  .sort((a, b) => b.score - a.score)
  .slice(0, MAX_AI_JOBS);

//     const TOP_N = 3;

// const topJobsForAI = results
//   .filter(r => r.score >= 35) // optional threshold
//   .slice(0, TOP_N);

  /* -------- AI ANALYSIS (TOP JOBS ONLY) -------- */
for (const jobMeta of topJobsForAI) {

  // HARD STOP — no AI below threshold
  if (jobMeta.score < AI_THRESHOLD) continue;

  const job = vacancies.find(
    v => v._id.toString() === jobMeta.vacancyId.toString()
  );

  if (!job) continue;

  const aiResult = await analyzeResumeVsJob(resumeText, job);

  await Vacancy.updateOne(
    { _id: job._id },
    { $pull: { aiScores: { userId } } }
  );

  await Vacancy.updateOne(
    { _id: job._id },
    {
      $push: {
        aiScores: {
          userId,
          score: aiResult.aiScore,
          matchedSkills: aiResult.matchedSkills,
          missingSkills: aiResult.missingSkills,
          summary: aiResult.summary,
          analyzedAt: new Date()
        }
      }
    }
  );
}

  // await User.updateOne(
  //   { _id: userId },
  //   { $set: { atsAnalyzed: true } }
  // );

    res.json({
      message: "ATS analysis completed",
      totalJobs: results.length,
      results
    });

  } catch (err) {
    console.error("ATS analyze error:", err);
    res.status(500).json({ error: "ATS analysis failed" });
  }
});

module.exports = router;
