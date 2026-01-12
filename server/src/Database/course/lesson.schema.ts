
import mongoose, { Schema } from "mongoose";

const lessonSchema = new Schema(
  {
    courseId: {
      type: Schema.Types.ObjectId,
      ref: "course",
      required: true,
      index: true,
    },

    chapterId: {
      type: Schema.Types.ObjectId,
      ref: "chapter",
      required: true,
      index: true,
    },

    lessonNo: {
      type: Number,
      required: true,
    },

    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
    },

    videoUrl: {
      type: String,
      required: true,
    },

    thumbnail: {
      type: String,
      required: true,
    },

    duration: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const LessonModel =
  mongoose.models.lesson ||
  mongoose.model("lesson", lessonSchema);
