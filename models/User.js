const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  id: { type: mongoose.Schema.Types.ObjectId, auto: true }, // Explicitly adding an id field
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  communication_score: { type: Number, default: 0 },
  aptitude_score: { type: Number, default: 0 },
  technical_score: { type: Number, default: 0 },
  overall_score: { type: Number, default: 0 },
}, { timestamps: true }); // Adds createdAt and updatedAt timestamps automatically

module.exports = mongoose.model("User", UserSchema);
