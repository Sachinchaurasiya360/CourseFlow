const mongoose = require("mongoose");
const { string, boolean } = require("zod");
require("dotenv").config();
const connectdb = async () => {
  try {
    await mongoose.connect(process.env.Databaseurl);
    console.log("Database has been connected");
  } catch (error) {
    console.log(error);
  }
};

connectdb();

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true, lowercase: true },
    firstName: { type: String, trim: true },
    LastName: String,
    password: String,
    purchesedCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: "course" }],
    role: { type: String, enum: ["student", "admin"], default: "student" },
  },
  { timestamps: true }
);
const courseContentSchema = new mongoose.Schema({
  title: String,
  description: String,
  videourl: String,
  progressStatus: { type: Number, default: 0 },
  isPreview: {
    type: Boolean,
    default: false,
  },
});
const weekSchema = new mongoose.Schema({
  weekNumber: {
    type: Number,
    required: true,
  },
  title: String,
  lesson: [courseContentSchema],
});
const courseSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    price: { type: Number, required: true },
    category: String,
    createdby: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    thumbnail: String,
    coursehighlight: {
      type: [String],
      default: [],
    },
    Weeks: [weekSchema],
  },
  { timestamps: true }
);
const coupanSchema = new mongoose.Schema(
  {
    coupanCode: { require: true, type: String, unique: true, trim: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: user },
    Comment: String,
    discountValue: Number,
    MaxUsages: Number,
    UsedCount: Number,
    isActive: Boolean,
    expiresAt: Date,
  },
  { timestamps: true }
);
const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    require: true,
  },
  content: { type: String, require: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: user },
  coverImage: {
    require: false,
    url: String,
  },
  published: false,
  publishedAt: Date.now(),
});

const user = mongoose.model("user", userSchema);
const course = mongoose.model("course", courseSchema);
const blog = mongoose.model("blog", blogSchema);

module.exports = { user, course, blog };
