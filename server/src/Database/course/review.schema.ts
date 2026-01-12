
import mongoose, { Schema } from "mongoose";

const reviewSchema = new Schema(
  {
    courseId: {
      type: Schema.Types.ObjectId,
      ref: "course",
      required: true,
      index: true,
    },

    userId: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },

    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },

    comment: {
      type: String,
      trim: true,
      maxlength: 1000,
    },
  },
  { timestamps: true }
);

// prevent duplicate reviews
reviewSchema.index(
  { userId: 1, courseId: 1 },
  { unique: true }
);

export const ReviewModel =
  mongoose.models.review ||
  mongoose.model("review", reviewSchema);
