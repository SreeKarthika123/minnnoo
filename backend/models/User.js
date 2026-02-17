
const mongoose = require("mongoose");
const { ChatCompletionStreamingRunner } = require("openai/lib/ChatCompletionStreamingRunner.js");

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
    role: { type: String, enum: ["employee", "hr"], default: "employee" },
  phone: { type: String },              // New field
  resume: { type: String },             // File path
  designation: { type: String }, 
   skills: { type: [String], default: [] },
   refreshToken:{type:String},
 parsedResume: {
    text: String,
    // embedding: { type: [Number], default: [] }
  }

//    analysisProgress: {
//   analyzed: { type: Number, default: 0 },
//   total: { type: Number, default: 0 },
//   status: { type: String, default: "idle" }
// }

         // Optional additional details
});

module.exports = mongoose.model("User", UserSchema);
