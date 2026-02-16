// import Vacancy from "../models/Vacancy.js";


// const Vacancy = require("../models/Vacancy");

// // Create vacancy (HR only)
// export const createVacancy = async (req, res) => {
//   try {
//     const { title, description, location, salary } = req.body;
//     const vacancy = new Vacancy({
//       title,
//       description,
//       location,
//       salary,
//       createdBy: req.user.id, // from auth middleware
//     });
//     await vacancy.save();
//     res.json({ message: "Vacancy posted successfully", vacancy });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Server error" });
//   }
// };

// // Get all vacancies (for employees)
// export const getVacancies = async (req, res) => {
//   try {
//     const vacancies = await Vacancy.find().populate("createdBy", "name email");
//     res.json(vacancies);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Server error" });
//   }
// };


// const Vacancy = require("../models/Vacancy");

// // Create vacancy (HR only)
// // exports.createVacancy = async (req, res) => {
// //   try {
// //     const { title, description, location, salary } = req.body;
// //     const vacancy = new Vacancy({
// //       title,
// //       description,
// //       location,
// //       salary,
// //       createdBy: req.user.id, // from auth middleware
// //     });
// //     await vacancy.save();
// //     res.json({ message: "Vacancy posted successfully", vacancy });
// //   } catch (err) {
// //     console.error(err);
// //     res.status(500).json({ message: "Server error" });
// //   }
// // };

// exports.createVacancy = async (req, res) => {
//   try {
//     const { title, description, location, salary } = req.body;

//     // Hardcoded HR info
//     const hr = {
//       name: "HR Admin",
//       email: "hr@example.com",
//       role: "hr"
//     };

//     const vacancy = new Vacancy({
//       title,
//       description,
//       location,
//       salary,
//     //   createdBy: hr, // store HR info directly
//     });

//     await vacancy.save();
//     res.json({ message: "Vacancy posted successfully", vacancy });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Server error" });
//   }
// };


// // // Get all vacancies (for employees)
// // exports.getVacancies = async (req, res) => {
// //   try {
// //     const vacancies = await Vacancy.find().populate("createdBy", "name email");
// //     res.json(vacancies);
// //   } catch (err) {
// //     console.error(err);
// //     res.status(500).json({ message: "Server error" });
// //   }
// // };

// exports.getVacancies = async (req, res) => {
//   try {
//     const vacancies = await Vacancy.find(); // simple array
//     res.json(vacancies);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Server error" });
//   }
// };



const Vacancy = require("../models/Vacancy");
const User = require("../models/User");
const fetch = require("node-fetch"); // ✅ REQUIRED
const axios = require("axios");

const { analyzeVacancyForUser } = require("../routes/aiRoutes");

// exports.createVacancy = async (req, res) => {
//   try {
//     // 1️⃣ Save vacancy
//     const vacancy = new Vacancy(req.body);
//     await vacancy.save();

//     // 2️⃣ Respond immediately to HR
//     res.status(201).json({
//       message: "Vacancy created. AI analysis started.",
//       vacancy
//     });

//     // 3️⃣ Background analysis (SAFE & DIRECT)
//     const users = await User.find({
//       resume: { $exists: true, $ne: null }
//     }).select("_id");

//     for (const user of users) {
//       try {
//         await analyzeVacancyForUser(user._id, vacancy._id);

//         // ⏳ delay for Gemini safety
//         await new Promise(r => setTimeout(r, 5000));

//       } catch (err) {
//         console.error("AI failed for user:", user._id.toString());
//       }
//     }

//     console.log("✅ New vacancy fully analyzed:", vacancy._id);

//   } catch (err) {
//     console.error("Create vacancy error:", err);
//     res.status(500).json({ message: "Failed to create vacancy" });
//   }
// };
// Create vacancy (HR only)
// exports.createVacancy = async (req, res) => {
//   try {
//     const { title, description, location, salary } = req.body;

//     const vacancy = new Vacancy({
//       title,
//       description,
//       location,
//       salary,
//       // No need for createdBy since only one HR exists
//     });

//     await vacancy.save();

//     // ✅ Always return the saved vacancy as an object
//     res.json({ message: "Vacancy posted successfully", vacancy });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Server error" });
//   }
// };



exports.createVacancy = async (req, res) => {
  try {
    // 1️Save vacancy
    const vacancy = new Vacancy(req.body);
    await vacancy.save();

    // 2️Respond immediately to HR
    res.status(201).json({
      message: "Vacancy created. AI analysis started in background.",
      vacancy
    });

    // 3️Background AI processing (NON-BLOCKING)
    setImmediate(async () => {
      const users = await User.find({
        resume: { $exists: true, $ne: null }
      }).select("_id");

      for (const user of users) {
        try {
          await axios.post(
            "http://localhost:5000/api/ai/match-score",
            {
              userId: user._id.toString(),
              vacancyId: vacancy._id.toString()
            }
          );

          // delay to avoid Gemini / AI rate limit
          await new Promise(r => setTimeout(r, 1200));

        } catch (err) {
          console.error(
            "AI trigger failed:",
            user._id.toString(),
            err.message
          );
        }
      }

      console.log(" AI analysis completed for vacancy:", vacancy._id);
    });

  } catch (err) {
    console.error("Create vacancy error:", err);
    res.status(500).json({ message: "Failed to create vacancy" });
  }
};

// exports.createVacancy = async (req, res) => {
//   try {
//     const { title, description, location, salary, skills } = req.body;

//     if (!skills || !Array.isArray(skills) || skills.length === 0) {
//       return res.status(400).json({ message: "Skills are required" });
//     }

//     const vacancy = new Vacancy({
//       title,
//       description,
//       location,
//       salary,
//       skills, // SAVE SKILLS
//     });

//     await vacancy.save();

//     res.json({
//       message: "Vacancy posted successfully",
//       vacancy,
//     });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Server error" });
//   }
// };

// // Get all vacancies (for employees)
// exports.getVacancies = async (req, res) => {
//   try {
//     const vacancies = await Vacancy.find().sort({ createdAt: -1 }); // latest first

//     //  Ensure we always return an array
//     res.json(Array.isArray(vacancies) ? vacancies : []);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Server error" });
//   }
// };


// const Vacancy = require("../models/Vacancy");

// Get all vacancies (for employees)
exports.getVacancies = async (req, res) => {
  try {
    const vacancies = await Vacancy
      .find()
      .sort({ createdAt: -1 }) // latest first
      .lean();                //  important for frontend usage

    // Always return array
    res.json(Array.isArray(vacancies) ? vacancies : []);
  } catch (err) {
    console.error("Get vacancies error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
