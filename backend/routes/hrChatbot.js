const express = require("express");
const router = express.Router();
const Vacancy = require("../models/Vacancy");
const User = require("../models/User");

/*
 INTENTS SUPPORTED:
 1. top candidates for a job
 2. candidates above score
 3. why candidate
 4. common missing skills
*/

// ===============================
// 🤖 HR CHATBOT API
// ===============================
router.post("/chat", async (req, res) => {
  try {
    const { message } = req.body;
    const text = message.toLowerCase();

    // 1️⃣ TOP CANDIDATES FOR A JOB
    if (text.includes("top") && text.includes("candidates")) {
      const vacancies = await Vacancy.find().populate("aiScores.userId", "name");

      const results = [];

      vacancies.forEach(v => {
        v.aiScores
          .filter(s => s.score >= 80)
          .forEach(s => {
            results.push({
              name: s.userId.name,
              job: v.title,
              score: s.score
            });
          });
      });

      return res.json({
        reply: results.length
          ? results
          : "No high-matching candidates found."
      });
    }

    // 2️⃣ CANDIDATES ABOVE SCORE
    if (text.includes("above")) {
      const score = parseInt(text.match(/\d+/)?.[0] || 80);

      const vacancies = await Vacancy.find().populate("aiScores.userId", "name");
      const results = [];

      vacancies.forEach(v => {
        v.aiScores
          .filter(s => s.score >= score)
          .forEach(s => {
            results.push({
              name: s.userId.name,
              job: v.title,
              score: s.score
            });
          });
      });

      return res.json({ reply: results });
    }

    // 3️⃣ WHY IS CANDIDATE GOOD
    if (text.includes("why")) {
      const users = await User.find();
      const name = users.find(u => text.includes(u.name.toLowerCase()));

      if (!name) {
        return res.json({ reply: "Candidate not found." });
      }

      const vacancies = await Vacancy.find({
        "aiScores.userId": name._id
      });

      const explanations = [];

      vacancies.forEach(v => {
        const s = v.aiScores.find(
          a => a.userId.toString() === name._id.toString()
        );

        explanations.push({
          job: v.title,
          score: s.score,
          matchedSkills: s.matchedSkills,
          missingSkills: s.missingSkills
        });
      });

      return res.json({ reply: explanations });
    }

    // 4️⃣ COMMON SKILL GAPS
    if (text.includes("missing") || text.includes("gaps")) {
      const vacancies = await Vacancy.find();

      const skillCount = {};

      vacancies.forEach(v => {
        v.aiScores.forEach(s => {
          s.missingSkills.forEach(skill => {
            skillCount[skill] = (skillCount[skill] || 0) + 1;
          });
        });
      });

      const sorted = Object.entries(skillCount)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5);

      return res.json({
        reply: sorted.map(([skill, count]) => ({
          skill,
          count
        }))
      });
    }

    // DEFAULT
    res.json({
      reply:
        "Try: top candidates, candidates above 85, why Karthika, common skill gaps"
    });
  } catch (err) {
    console.error("HR chatbot error:", err);
    res.status(500).json({ reply: "Chatbot error" });
  }
});

module.exports = router;
