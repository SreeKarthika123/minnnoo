// const express = require("express");
// const router = express.Router();
// const { signup, login ,getProfile, updateProfile } = require("../controllers/authController");
// const multer = require("multer"); 
// const path = require("path");

// // POST /api/auth/signup
// router.post("/signup", signup);

// // POST /api/auth/login
// router.post("/login", login);


// // // Auth routes
// // router.post("/signup", signup);
// // router.post("/login", login);
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "uploads/"); // folder must exist
//   },
//    filename: function (req, file, cb) {
//     cb(null, file.originalname); // keep original name
//   },
//   // filename: function (req, file, cb) {
//   //   cb(null, Date.now() + path.extname(file.originalname));
//   // },
// });
// const upload = multer({ storage });

// // Profile routes
// router.get("/profile/:id", getProfile);

// // router.get("/profile/:id", async (req, res) => {
// //   try {
// //     const user = await User.findById(req.params.id).select("-password");
// //     if (!user) return res.status(404).json({ message: "User not found" });

// //     res.json(user); // will include skills array
// //   } catch (err) {
// //     console.error(err);
// //     res.status(500).json({ message: "Server error" });
// //   }
// // });
// router.put("/profile/:id", upload.single("resume"), updateProfile);

// // // Profile routes
// // router.get("/profile/:id", getProfile);
// // router.put("/profile/:id", upload.single("resume"), updateProfile);

// module.exports = router;
// // module.exports = router;



const express = require("express");
const router = express.Router();
const { signup, login, refreshToken,getProfile, updateProfile } = require("../controllers/authController");
const multer = require("multer");

// Multer setup
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // folder must exist
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // keep original name
  },
});
const upload = multer({ storage });

// Auth routes
router.post("/signup", signup);
router.post("/login", login);

router.post("/refresh-token", refreshToken);
// Profile routes
router.get("/profile/:id", getProfile);
router.put("/profile/:id", upload.single("resume"), updateProfile);


router.post("/refresh", async (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(401).json({ message: "No refresh token" });
  }

  try {
    const decoded = jwt.verify(
      refreshToken,
      process.env.JWT_REFRESH_SECRET
    );

    const newAccessToken = jwt.sign(
      { id: decoded.id },
      process.env.JWT_ACCESS_SECRET,
      { expiresIn: "90s" } // 1.5 min
    );

    res.json({ accessToken: newAccessToken });
  } catch (err) {
    return res.status(403).json({ message: "Refresh token expired" });
  }
});

module.exports = router;
