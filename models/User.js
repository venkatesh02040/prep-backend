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
    createdAtIST: { type: Date }, 
    updatedAtIST: { type: Date }, 
  },
  { timestamps: true } 
);

UserSchema.pre("save", function (next) {
  const now = new Date();
  const istTime = new Date(now.getTime() + 5.5 * 60 * 60 * 1000); 
  this.createdAtIST = istTime;
  this.updatedAtIST = istTime;
  next();
});

UserSchema.pre("findOneAndUpdate", function (next) {
  const now = new Date();
  const istTime = new Date(now.getTime() + 5.5 * 60 * 60 * 1000); 
  this.set({ updatedAtIST: istTime });
  next();
});

module.exports = mongoose.model("User", UserSchema);
