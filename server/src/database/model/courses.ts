import mongoose from "mongoose";

const courseSchema = new mongoose.Schema(
  {
    courseName: {
      type: String,
      required: true,
      trim: true,
    },
    courseDescription: {
      type: String,
      required: true,
    },
    coursePrice: {
      type: Number,
      required: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    thumbnail: {
      type: String,

      required: false,
    },
    category: String,
    highlights: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  },
);

const courseModuleSchema = new mongoose.Schema(
  {
    moduleNo: {
      type: Number,
      required: true,
      default: true, //Wrong give a default incremental
    },
    title: {
      type: String,
      required: true,
    },
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
      index: true,
    },
  },
  {
    timestamps: true,
  },
);

const courseContentSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  type: {
    enum: ["VIDEO", "TEXT"],
  },

  notes: {
    types: String,
    required: false,
  },
});
export const courseContent = mongoose.model(
  "courseContent",
  courseContentSchema,
);
export const Course = mongoose.model("Course", courseSchema);
export const CourseModule = mongoose.model("CourseModule", courseModuleSchema);
