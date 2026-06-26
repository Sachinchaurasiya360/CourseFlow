import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: { type: String, required: true, select: false },
  authenticationMethod: { type: String, enum: ["local", "google"] },
  role: {
    type: String,
    enum: ["STUDENT", "ADMIN"],

    default: "STUDENT",
  },
  bio: { type: String },
  isVerified: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

export const User = mongoose.model("User", userSchema);
