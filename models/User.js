const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    communication_score: { type: Number, default: 0 },
    aptitude_score: { type: Number, default: 0 },
    technical_score: { type: Number, default: 0 },
    overall_score: { type: Number, default: 0 },
    createdAtIST: { type: Date }, // Store timestamp in IST
    updatedAtIST: { type: Date }, // Store timestamp in IST
  },
  { timestamps: true } // MongoDB default timestamps (UTC)
);

// Convert UTC timestamps to IST before saving
UserSchema.pre("save", function (next) {
  const now = new Date();
  const istTime = new Date(now.getTime() + 5.5 * 60 * 60 * 1000); // Convert to IST
  this.createdAtIST = istTime;
  this.updatedAtIST = istTime;
  next();
});

// Convert updated timestamp to IST before updating
UserSchema.pre("findOneAndUpdate", function (next) {
  const now = new Date();
  const istTime = new Date(now.getTime() + 5.5 * 60 * 60 * 1000); // Convert to IST
  this.set({ updatedAtIST: istTime });
  next();
});

module.exports = mongoose.model("User", UserSchema);
