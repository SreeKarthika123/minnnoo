// import mongoose from "mongoose";
const mongoose = require("mongoose");
const vacancySchema = new mongoose.Schema({
  title: String,
  description: String,
  location: String,
  salary: String,
   skills: {
    type: [String],         
    required: true,
    default: [],
  },

   aiScores: [
    {
      userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      score: Number,
      matchedSkills: [String],
      missingSkills: [String],
      projectsMatched: [String],
      summary: String,
      analyzedAt: { type: Date, default: Date.now }
    }
  ],
//   createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // HR who posted
  createdAt: { type: Date, default: Date.now },
});

// export default mongoose.model("Vacancy", vacancySchema);

module.exports = mongoose.model("Vacancy", vacancySchema);
