import mongoose, { Schema } from "mongoose";

const chapterSchema = new Schema(
  {
    courseId: {
      type: Schema.Types.ObjectId,
      ref: "course",
      required: true,
      index: true,
    },

    chapterNo: {
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
  },
  { timestamps: true }
);

export const ChapterModel =
  mongoose.models.chapter ||
  mongoose.model("chapter", chapterSchema);
