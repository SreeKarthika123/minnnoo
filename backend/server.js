const express = require("express");
// const http = require("http");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config(); // <-- must be at the very top
// const { precomputeJobEmbeddings } = require("./routes/aiRoutes");

const dashboardRoutes = require("./routes/dashboardRoutes");
const authRoutes = require("./routes/auth");
const hrRoutes = require("./routes/hr.js");
const app = express();
const aiRoutes =require("./routes/aiRoutes.js");
const atsScoring=require("./routes/ats.js");
const vacancyRoutes = require("./routes/vacancy");
// const vacancy=require("/routes/vacancy.js");
// const server = http.createServer(app);

// // attach Socket.IO chatbot
// const attachChatbot = require("./routes/chatbot");
// attachChatbot(server);
// const chatbot=require("./routes/chatbot.js");
// const matchRoutes = require("./routes/aiRoutes.js");


app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

// MongoDB connection
mongoose
  .connect("mongodb://127.0.0.1:27017/minno")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/hr", hrRoutes);
// app.use("/api/ai", matchRoutes);
// app.use("/api/ai", aiRoutes);
// app.use("/api/ai", aiRoutes);
app.use("/api/ats",atsScoring);
app.use("/api/dashboard", dashboardRoutes);
// app.use("/api/")
app.use("/api/vacancies", vacancyRoutes);
app.use("/api/notifications", require("./routes/notification"));

// app.use("/api/hr-chatbot", require("./routes/hrChatbot"));
app.use("/api/ai", aiRoutes);
// Start server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
