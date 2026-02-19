const fs = require("fs");
const path = require("path");
const pdfParse = require("pdf-parse");
const User = require("../models/User");
const Vacancy = require("../models/Vacancy");

const {
  textToVector,
  cosineSimilarity,
  keywordScore
} = require("./atsScoring");

module.exports = async function analyzeATSForOne(userId, vacancyId) {
  const user = await User.findById(userId);
  if (!user?.resume) return;

  const job = await Vacancy.findById(vacancyId);
  if (!job) return;

  // 📄 Read resume
  const resumePath = path.join(__dirname, "../", user.resume);
  const pdf = await pdfParse(fs.readFileSync(resumePath));
  const resumeText = pdf.text.slice(0, 3500);

  const resumeVector = textToVector(resumeText);

  // 📌 Job text
  const jobText = `
    ${(job.skills || []).join(" ")}
    ${job.jobDescription || ""}
  `;

  const jobVector = textToVector(jobText);

  const keyword = keywordScore(resumeText, jobText);
  const cosine = cosineSimilarity(resumeVector, jobVector);

  let finalScore = Math.round((0.6 * keyword + 0.4 * cosine) * 100);
  if (finalScore < 15) finalScore = 15;

  // 🧹 Remove old score
  await Vacancy.updateOne(
    { _id: vacancyId },
    { $pull: { atsScores: { userId } } }
  );

  // 💾 Save ATS score
  await Vacancy.updateOne(
    { _id: vacancyId },
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
};
