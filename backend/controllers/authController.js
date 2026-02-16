const User = require("../models/User");
const bcrypt = require("bcryptjs");
const Vacancy = require("../models/Vacancy");

// ✅ Signup controller
exports.signup = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Check if user exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    user = new User({
      name,
      email,
      password: hashedPassword,
    });

    await user.save();

    res.status(201).json({
      message: "User created successfully",
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};


const jwt = require("jsonwebtoken");
const { generateAccessToken, generateRefreshToken } = require("../utils/token");

// ✅ Login
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid password" });

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    console.log("✅ ACCESS TOKEN:", accessToken);
console.log("✅ REFRESH TOKEN:", refreshToken);
    user.refreshToken = refreshToken;
    await user.save();

    res.json({
      accessToken,
      refreshToken,
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};



exports.refreshToken = async (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(401).json({ message: "Refresh token required" });
  }

  try {
    const decoded = jwt.verify(
      refreshToken,
      process.env.JWT_REFRESH_SECRET
    );

    const user = await User.findById(decoded.id);
    if (!user || user.refreshToken !== refreshToken) {
      return res.status(403).json({ message: "Invalid refresh token" });
    }

    const newAccessToken = generateAccessToken(user);

    res.json({ accessToken: newAccessToken });
  } catch (err) {
    return res.status(403).json({ message: "Refresh token expired" });
  }
};


// // ✅ Login controller
// exports.login = async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const user = await User.findOne({ email });
//     if (!user) return res.status(400).json({ message: "User not found" });

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) return res.status(400).json({ message: "Invalid password" });

//     res.json({
//       user: { id: user._id, name: user.name, email: user.email },
//     });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Server error" });
//   }
// };


// exports.getProfile = async (req, res) => {
//   const userId = req.params.id;

//   try {
//     const user = await User.findById(userId).select("-password");
//     if (!user) return res.status(404).json({ message: "User not found" });
//     res.json(user);
//   } catch (err) {
//     res.status(500).json({ message: "Server error" });
//   }
// };

// // Update profile
// exports.updateProfile = async (req, res) => {
//   const userId = req.params.id;
//   const { name, phone, designation } = req.body;
//   let resumePath = null;

//   if (req.file) {
//     resumePath = `/uploads/${req.file.filename}`;
//   }

//   try {
//     const user = await User.findById(userId);
//     if (!user) return res.status(404).json({ message: "User not found" });

//     user.name = name || user.name;
//     user.phone = phone || user.phone;
//     user.designation = designation || user.designation;
//     if (resumePath) user.resume = resumePath;

//     await user.save();

//     res.json({ message: "Profile updated successfully", user });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Server error" });
//   }
// };


// const User = require("../models/User");

// Get profile
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// Update profile

// exports.updateProfile = async (req, res) => {
//   try {
//     const user = await User.findById(req.params.id);
//     if (!user) return res.status(404).json({ message: "User not found" });

//     // Extract values from req.body (works with multer FormData)
//     const { name, phone, designation, skills } = req.body;

//     user.name = name || user.name;
//     user.phone = phone || user.phone;
//     user.designation = designation || user.designation;

//     // Optional skills as array
//     if (skills) {
//       try {
//         const skillsArray = JSON.parse(skills);
//         if (Array.isArray(skillsArray)) user.skills = skillsArray;
//       } catch {}
//     }

//     // Resume file
//     if (req.file) {
//       user.resume = `uploads/${req.file.filename}`;
//     }

//     await user.save();

//     res.json({ message: "Profile updated successfully", user });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Server error" });
//   }
// };



exports.updateProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const { name, phone, designation, skills } = req.body;

    user.name = name || user.name;
    user.phone = phone || user.phone;
    user.designation = designation || user.designation;

    if (skills) {
      try {
        const skillsArray = JSON.parse(skills);
        if (Array.isArray(skillsArray)) {
          user.skills = skillsArray;
        }
      } catch (err) {
        console.warn("Invalid skills JSON");
      }
    }

    let resumeUpdated = false;

    //  Resume upload
    if (req.file) {
      user.resume = `/uploads/${req.file.filename}`;
      resumeUpdated = true;
    }

    await user.save();

  
    if (resumeUpdated) {
      // 1️ Remove old scores for this user
      await Vacancy.updateMany(
        {},
        { $pull: { aiScores: { userId: user._id } } }
      );

      // 2️Trigger fresh analysis (background)
      fetch(`http://localhost:5000/api/ai/analyze-all/${user._id}`, {
        method: "POST"
      }).catch(() => {
        console.warn("AI analyze trigger failed");
      });
    }

    res.json({
      message: resumeUpdated
        ? "Profile updated. Resume re-analysis started."
        : "Profile updated successfully",
      user
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
