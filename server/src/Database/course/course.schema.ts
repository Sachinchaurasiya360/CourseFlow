import mongoose, { Schema } from "mongoose";

const courseSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
    },

    thumbnail: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      enum: [
        "Web Development",
        "Mobile Development",
        "Data Science",
        "AI & ML",
        "Business",
      ],
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },

    instructor: {
      type: Schema.Types.ObjectId,
      ref: "admin",
      required: true,
    },

    totalRegistered: {
      type: Number,
      default: 0,
    },

    rating: {
      average: {
        type: Number,
        default: 0,
        min: 0,
        max: 5,
      },
      count: {
        type: Number,
        default: 0,
      },
    },
  },
  { timestamps: true }
);

export const CourseModel =
  mongoose.models.course ||
  mongoose.model("course", courseSchema);
