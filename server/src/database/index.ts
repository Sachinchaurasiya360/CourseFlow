import mongoose, { mongo } from "mongoose";
import { logger } from "../utils/logger/logger.ts";
import dotenv from "dotenv";
dotenv.config();

export const connectToDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI as string);
    logger.info("Database connected");
  } catch (error) {
    console.error("MongoDB connection failed", error);
    process.exit(1)
  }
};


const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: { type: String, required: true , select: false},
  authenticationMethod: { type: String, enum: ["local", "google"] },
  role: { type: String, enum: ["STUDENT", "ADMIN"] },
  bio: { type: String },
  isVerified: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

const courseSchema = new mongoose.Schema({
  courseid: { type: Number, unique: true },
  courseName: {
    type: String,
  },
  courseDesciption: {
    type: String,
    required: true,
  },
  coursePrice: { type: Number, required: true },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    index: true,
  }, // Called parent referencing.
  thumbnail: {
    type: String,
    required: true,
  },
  category: String,
  highlight: {
    type: [String],
    required: true,
    default: [],
  },
});
const courseContentSchema = new mongoose.Schema({});

export const User = mongoose.model("User", userSchema);
export const Course = mongoose.model("Course", courseSchema);
export const CourseContent = mongoose.model(
  "CourseContent",
  courseContentSchema,
);
