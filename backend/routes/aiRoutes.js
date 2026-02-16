



// const express = require("express");
// const router = express.Router();
// const fs = require("fs");
// const path = require("path");
// const pdfParse = require("pdf-parse");
// const { GoogleGenerativeAI } = require("@google/generative-ai");

// const User = require("../models/User");
// const Vacancy = require("../models/Vacancy");

// /* ---------- GEMINI INIT ---------- */
// const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
// const model = genAI.getGenerativeModel({
//   model: "gemini-2.5-flash",
//   generationConfig: {
//     responseMimeType: "application/json",
//     temperature: 0.2
//   }
// });




// /* ======================================================
//    🔔 DASHBOARD – FETCH HIGH MATCHING JOBS
// ====================================================== */
// router.get("/dashboard-matches/:userId", async (req, res) => {
//   try {
//     const { userId } = req.params;

//     const vacancies = await Vacancy.find({
//       aiScores: {
//         $elemMatch: {
//           userId,
//           score: { $gte: 70 }
//         }
//       }
//     }).select("title aiScores");

//     const matches = vacancies.map(v => {
//       const scoreObj = v.aiScores.find(
//         s => s.userId.toString() === userId
//       );

//       return {
//         vacancyId: v._id,
//         title: v.title,
//         score: scoreObj?.score || 0
//       };
//     });

//     res.json({
//       count: matches.length,
//       matches
//     });
//   } catch (err) {
//     console.error("Dashboard match error:", err);
//     res.status(500).json({ message: "Failed to fetch dashboard matches" });
//   }
// });

// const ResumeScore = require("../models/ResumeScore");

// router.get("/user-scores/:userId", async (req, res) => {
//   try {
//     const scores = await ResumeScore.find({ userId: req.params.userId });
//     res.json(scores);
//   } catch (err) {
//     res.status(500).json({ message: "Failed to fetch scores" });
//   }
// });

// /* ======================================================
//    🤖 MATCH SCORE API
// ====================================================== */
// router.post("/match-score", async (req, res) => {
//   try {
//     const { userId, vacancyId } = req.body;

//     const user = await User.findById(userId);
//     const vacancy = await Vacancy.findById(vacancyId);

//     if (!user?.resume) {
//       return res.status(400).json({ message: "Resume not found" });
//     }

//     if (!vacancy) {
//       return res.status(400).json({ message: "Vacancy not found" });
//     }

//     /* ---------- READ RESUME ---------- */
//     const resumePath = path.join(__dirname, "../", user.resume);
//     const buffer = fs.readFileSync(resumePath);
//     const pdfData = await pdfParse(buffer);

//     const resumeText = pdfData.text
//       .replace(/•/g, "-")
//       .replace(/[—–]/g, "-")
//       .replace(/\s+/g, " ")
//       .trim()
//       .slice(0, 3500);

//     /* ---------- JOB DATA ---------- */
//     const jobSkills =
//       Array.isArray(vacancy.skills) && vacancy.skills.length > 0
//         ? vacancy.skills.join(", ")
//         : "";

//     const jobDescription = vacancy.description || "";

//     const combinedJobText = `
// Job Skills:
// ${jobSkills || "Not explicitly listed"}

// Job Description:
// ${jobDescription || "Not provided"}
// `;

//     /* ---------- PROMPT ---------- */
//     const prompt = `
// You are an Applicant Tracking System (ATS).

// Compare Resume SKILLS + PROJECTS with Job Skills AND Job Description.
// Extract missing skills from JD if not explicitly listed.
// Return realistic ATS score (0–100).

// Return ONLY valid JSON:
// {
//   "score": number,
//   "matchedSkills": [],
//   "missingSkills": [],
//   "projectsMatched": [],
//   "summary": ""
// }

// JOB:
// ${combinedJobText}

// RESUME:
// ${resumeText}
// `;

//     /* ---------- GEMINI ---------- */
//     const result = await model.generateContent(prompt);
//     const rawText = result.response.text();

//     console.log("🔵 Gemini RAW RESPONSE:\n", rawText);

//     let aiResult;
//     try {
//       aiResult = JSON.parse(rawText);
//     } catch {
//       aiResult = {
//         score: 0,
//         matchedSkills: [],
//         missingSkills: [],
//         projectsMatched: [],
//         summary: "AI response could not be parsed"
//       };
//     }

//     /* ======================================================
//        🔥 SAVE / UPDATE AI SCORE IN VACANCY
//     ====================================================== */
//     if (!vacancy.aiScores) vacancy.aiScores = [];

//     const existingIndex = vacancy.aiScores.findIndex(
//       s => s.userId.toString() === userId
//     );

//     const scoreData = {
//       userId,
//       score: aiResult.score ?? 0,
//       matchedSkills: aiResult.matchedSkills ?? [],
//       missingSkills: aiResult.missingSkills ?? [],
//       projectsMatched: aiResult.projectsMatched ?? [],
//       summary: aiResult.summary ?? "",
//       analyzedAt: new Date()
//     };

//     if (existingIndex > -1) {
//       vacancy.aiScores[existingIndex] = scoreData;
//     } else {
//       vacancy.aiScores.push(scoreData);
//     }

//     await vacancy.save();

//     /* ---------- RESPONSE ---------- */
//     res.json(scoreData);

//   } catch (err) {
//     console.error("❌ AI match-score error:", err);
//     res.status(500).json({
//       score: 0,
//       matchedSkills: [],
//       missingSkills: [],
//       projectsMatched: [],
//       summary: "AI service temporarily unavailable"
//     });
//   }
// });

// module.exports = router;



const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");
const pdfParse = require("pdf-parse");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const User = require("../models/User");
const Vacancy = require("../models/Vacancy");
const analysisProgress = {};


const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({
  model:
  // "gemini-2.5-pro",
   "gemini-2.5-flash-lite",
    // "gemini-2.5-flash",
  generationConfig: {
    responseMimeType: "application/json",
    temperature: 0.2
  }
});





async function analyzeVacancyForUser(userId, vacancyId) {
  const user = await User.findById(userId);
  const vacancy = await Vacancy.findById(vacancyId);

  if (!user?.resume || !vacancy) return;

  /* ---------- READ RESUME ---------- */
  const resumePath = path.join(__dirname, "../", user.resume);
  const buffer = fs.readFileSync(resumePath);
  const pdfData = await pdfParse(buffer);

  const resumeText = pdfData.text
    .replace(/•/g, "-")
    .replace(/[—–]/g, "-")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 3500);

  /* ---------- JOB DATA ---------- */
  const jobSkills = (vacancy.skills || []).join(", ");
  const jobDescription = vacancy.description || "";

  const prompt = `
You are an Applicant Tracking System (ATS).

Compare Resume SKILLS + PROJECTS with Job Skills AND Job Description.
Return realistic ATS score (0–100).

Return ONLY valid JSON:
{
  "score": number,
  "matchedSkills": [],
  "missingSkills": [],
  "projectsMatched": [],
  "summary": ""
}

JOB:
Skills: ${jobSkills}
Description: ${jobDescription}

RESUME:
${resumeText}
`;

  const result = await model.generateContent(prompt);
  // const rawText = result.response.text();
let rawText = result.response.text();

rawText = rawText
  .replace(/```json/g, "")
  .replace(/```/g, "")
  .trim();

  let aiResult;
  try {
    aiResult = JSON.parse(rawText);
  } catch {
    aiResult = {
      score: 0,
      matchedSkills: [],
      missingSkills: [],
      projectsMatched: [],
      summary: "AI parsing failed"
    };
  }

  /* ---------- SAVE SCORE ---------- */
  if (!vacancy.aiScores) vacancy.aiScores = [];

  const index = vacancy.aiScores.findIndex(
    s => s.userId.toString() === userId
  );

  const scoreData = {
    userId,
    score: aiResult.score || 0,
    matchedSkills: aiResult.matchedSkills || [],
    missingSkills: aiResult.missingSkills || [],
    projectsMatched: aiResult.projectsMatched || [],
    summary: aiResult.summary || "",
    analyzedAt: new Date()
  };

  if (index > -1) vacancy.aiScores[index] = scoreData;
  else vacancy.aiScores.push(scoreData);

  await vacancy.save();
}


router.get("/dashboard-matches/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    const vacancies = await Vacancy.find({
      aiScores: {
        $elemMatch: {
          userId,
          score: { $gte: 70 }
        }
      }
    }).select("title aiScores");

    const matches = vacancies.map(v => {
      const scoreObj = v.aiScores.find(
        s => s.userId.toString() === userId
      );

      return {
        vacancyId: v._id,
        title: v.title,
        score: scoreObj?.score || 0
      };
    });

    res.json({
      count: matches.length,
      matches
    });
  } catch (err) {
    console.error("Dashboard match error:", err);
    res.status(500).json({ message: "Failed to fetch dashboard matches" });
  }
});


// router.post("/match-score", async (req, res) => {
//   try {
//     const { userId, vacancyId } = req.body;

//     await analyzeVacancyForUser(userId, vacancyId);

//     const vacancy = await Vacancy.findById(vacancyId);
//     const score = vacancy.aiScores.find(
//       s => s.userId.toString() === userId
//     );

//     res.json(score);
//   } catch (err) {
//     console.error("AI match-score error:", err);
//     res.status(500).json({
//       score: 0,
//       matchedSkills: [],
//       missingSkills: [],
//       projectsMatched: [],
//       summary: "AI service unavailable"
//     });
//   }
// });


router.post("/match-score", async (req, res) => {
  try {
    const { userId, vacancyId } = req.body;
    if (!userId || !vacancyId) {
      return res.status(400).json({ error: "Missing userId or vacancyId" });
    }

    let vacancy = await Vacancy.findById(vacancyId);
    if (!vacancy) return res.status(404).json({ error: "Vacancy not found" });

    try {
      await analyzeVacancyForUser(userId, vacancyId);
    } catch (err) {
      if (err.status === 429) {
        console.warn("Gemini quota exceeded. Skipping AI analysis for this vacancy.");
      } else {
        console.error(err);
      }
    }

    vacancy = await Vacancy.findById(vacancyId);
    const score = vacancy.aiScores?.find(s => s.userId.toString() === userId);

    return res.json(
      score || {
        score: 0,
        matchedSkills: [],
        missingSkills: [],
        projectsMatched: [],
        summary: "AI analysis pending or quota hit"
      }
    );

  } catch (err) {
    console.error("AI match-score error:", err);
    return res.status(500).json({
      score: 0,
      matchedSkills: [],
      missingSkills: [],
      projectsMatched: [],
      summary: "AI service error or quota exceeded"
    });
  }
});


// router.post("/match-score", async (req, res) => {
//   try {
//     const { userId, vacancyId } = req.body;

//     if (!userId || !vacancyId) {
//       return res.status(400).json({
//         error: "Missing userId or vacancyId"
//       });
//     }

//     await analyzeVacancyForUser(userId, vacancyId);

//     const vacancy = await Vacancy.findById(vacancyId);

//     if (!vacancy) {
//       return res.status(404).json({
//         error: "Vacancy not found"
//       });
//     }

//     const score = vacancy.aiScores?.find(
//       s => s.userId.toString() === userId
//     );

//     // 🔥 ALWAYS return JSON
//     return res.json(
//       score || {
//         score: 0,
//         matchedSkills: [],
//         missingSkills: [],
//         projectsMatched: [],
//         summary: "Score not available (AI skipped or quota hit)"
//       }
//     );

//   } catch (err) {
//     console.error("AI match-score error:", err);

//     //  RETURN JSON EVEN ON ERROR
//     return res.status(500).json({
//       score: 0,
//       matchedSkills: [],
//       missingSkills: [],
//       projectsMatched: [],
//       projectsMatched: [],
//       summary: "AI quota exceeded or service error"
//     });
//   }
// });

// router.post("/reanalyze-missing/:userId", async (req, res) => {
//   const { userId } = req.params;

//   const vacancies = await Vacancy.find();
//   let fixed = 0;

//   for (const vac of vacancies) {
//     const scoreExists = vac.aiScores?.some(
//       s => s.userId.toString() === userId
//     );

//     if (!scoreExists) {
//       try {
//         await analyzeVacancyForUser(userId, vac._id);
//         fixed++;
//         await new Promise(r => setTimeout(r, 5000));
//       } catch {}
//     }
//   }

//   res.json({
//     message: "Missing scores regenerated",
//     fixed
//   });
// });


router.post("/analyze-all/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    const BATCH_SIZE = 1;      // safest for Gemini
    const DELAY_MS = 5000;     // 5 sec delay

    const vacancies = await Vacancy.find();
    const total = vacancies.length;

    analysisProgress[userId] = {
      analyzed: 0,
      total,
      status: "analyzing"
    };

    let analyzed = 0;

    for (const vac of vacancies) {
      try {
        const alreadyDone = vac.aiScores?.some(
          s => s.userId.toString() === userId
        );

        if (!alreadyDone) {
          await analyzeVacancyForUser(userId, vac._id);
        }

        analyzed++;
        analysisProgress[userId].analyzed = analyzed;

        // ⏳ delay EVERY job
        await new Promise(res => setTimeout(res, DELAY_MS));

      } catch (err) {
        console.error(
          "Analysis failed for vacancy:",
          vac._id.toString(),
          err.message
        );
        analyzed++;
        analysisProgress[userId].analyzed = analyzed;
      }
    }

    analysisProgress[userId].status = "completed";

    res.json({
      message: "All jobs analyzed",
      total
    });

  } catch (err) {
    console.error("Auto analysis failed:", err);
    res.status(500).json({ message: "Auto analysis failed" });
  }
});

// router.post("/analyze-initial/:userId", async (req, res) => {
//   const { userId } = req.params;

//   try {
//     // 🔍 Check if user already has ANY score
//     const alreadyAnalyzed = await Vacancy.exists({
//       "aiScores.userId": userId
//     });

//     if (alreadyAnalyzed) {
//       return res.json({ message: "Initial analysis already done" });
//     }

//     // 🎯 Pick only 6 jobs (latest / most relevant)
//     const jobs = await Vacancy.find()
//       .sort({ createdAt: -1 })
//       .limit(6);

//     // 🔥 Fire-and-forget (NO await)
//     jobs.forEach((job, index) => {
//       setTimeout(() => {
//         analyzeVacancyForUser(userId, job._id)
//           .catch(err =>
//             console.error("Initial analysis error:", err.message)
//           );
//       }, index * 3000); // 3s gap (safe for Gemini)
//     });

//     res.json({
//       message: "Initial resume analysis started",
//       jobsQueued: jobs.length
//     });
//   } catch (err) {
//     console.error("Initial analysis failed:", err);
//     res.status(500).json({ message: "Initial analysis failed" });
//   }
// });


router.get("/analysis-progress/:userId", (req, res) => {
  const progress = analysisProgress[req.params.userId];

  if (!progress) {
    return res.json({
      analyzed: 0,
      total: 0,
      status: "idle"
    });
  }

  res.json(progress);
});


router.get("/jobs-count", async (req, res) => {
  try {
    const totalJobs = await Vacancy.countDocuments();
    res.json({ total: totalJobs });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch job count" });
  }
});




module.exports = router;
