import mongoose from "mongoose";
import { CourseModel } from "./course/course.schema.js";
import { ChapterModel } from "./course/chapter.schema.js";
import { LessonModel } from "./course/lesson.schema.js";
import { ReviewModel } from "./course/review.schema.js";
const connectDb = async () => {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error("MONGODB_URI is not defined");
    }
    await mongoose.connect(process.env.MONGODB_URI!);
    console.log("Database connected successfully");
  } catch (error) {
    console.error("Database connection error:", error);
    process.exit(1);
  }
};

connectDb();

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  role: {
    type: String,
    enum: ["Student", "Admin"],
    default: "Student",
  },
  createdAt: { type: Date, default: Date.now },
  contactNumber: String,
  address: String,
  profilePicture: String,
});

const OtpSchema = new mongoose.Schema({
  email: String,
  otp: String,
  exipireAt: Date,
  verified: { type: Boolean, default: false },
  resetTOken: String,
  resetTokenExipireAt: Date,
});
const adminSchema=new mongoose.Schema({
  email:String,
  password:String
})

export const adminModel=mongoose.model("admin",adminSchema)
export const userModel = mongoose.model("user", userSchema);
export const otpModel = mongoose.model("otp", OtpSchema);
export { CourseModel, ChapterModel, LessonModel, ReviewModel };
