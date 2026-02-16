const mongoose = require("mongoose");

const resumeScoreSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    vacancyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vacancy",
      required: true
    },
    score: Number,
    matchedSkills: [String],
    missingSkills: [String],
    summary: String
  },
  { timestamps: true }
);

module.exports = mongoose.model("ResumeScore", resumeScoreSchema);
