// // import mongoose from "mongoose";
// const mongoose = require("mongoose");
// const vacancySchema = new mongoose.Schema({
//   title: String,
//   description: String,
//   location: String,
//   salary: String,
//    skills: {
//     type: [String],         
//     required: true,
//     default: [],
//   },

//    aiScores: [
//     {
//       userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
//       score: Number,
//       matchedSkills: [String],
//       missingSkills: [String],
//       projectsMatched: [String],
//       summary: String,
//       analyzedAt: { type: Date, default: Date.now }
//     }
//   ],
// //   createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // HR who posted
//   createdAt: { type: Date, default: Date.now },
// });

// // export default mongoose.model("Vacancy", vacancySchema);

// module.exports = mongoose.model("Vacancy", vacancySchema);



const mongoose = require("mongoose");

const vacancySchema = new mongoose.Schema(
  {
    // ===== BASIC JOB DETAILS =====
    title: {
      type: String,
      required: true,
      trim: true,
    },

    company: {
      type: String,
      required: true,
    },

    location: {
      type: String,
      required: true,
    },

    department: {
      type: String,
      required: true,
    },

    l1Department: {
      type: String,
      required: true,
    },

    employeeTypes: {
      type: [String], // Full Time, Intern, etc
      required: true,
    },

  jobDescription: {
  type: String,
  required: true,
},

    experienceMin: {
      type: Number,
      min: 0,
      required: true,
    },

    experienceMax: {
      type: Number,
      required: true,
    },

    expiresOn: {
      type: Date,
      required: true,
    },

    status: {
      type: String,
      default: "Active",
    },

    // ===== OPTIONAL HR FIELDS =====
    salary: {
      type: String,
    },

    skills: {
      type: [String],
      default: [],
    },
// ===== MANUAL PRE-SCORING (NO AI) =====
// ===== MANUAL PRE-SCORES =====
preScores: [
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    score: Number,
    analyzedAt: {
      type: Date,
      default: Date.now
    }
  }
],


    // ===== AI ANALYSIS =====
    aiScores: [
      {
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        score: Number,
        matchedSkills: [String],
        missingSkills: [String],
        projectsMatched: [String],
        summary: String,
        analyzedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Vacancy", vacancySchema);
