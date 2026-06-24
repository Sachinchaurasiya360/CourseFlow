
import mongoose from "mongoose"

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
const courseContentSchema = new mongoose.Schema({
  moduleNo:{ type:number},
  title: String,
  courseid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: courseSchema,
  },
});

export const Course = mongoose.model("Course", courseSchema);
export const CourseContent = mongoose.model(
  "CourseContent",
  courseContentSchema,
);
