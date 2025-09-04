const mongoose = require("mongoose");
const { array } = require("zod");
require("dotenv").config();
const connectdb = async () => {
  try {
    await mongoose.connect(process.env.Databaseurl);
    console.log("connected ");
  } catch (error) {}
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
    coursehighlight:{
        type:[String],
        default:[]
    },
    Weeks: [weekSchema],
  },
  { timestamps: true }
);

const user = mongoose.model("user", userSchema);
const course = mongoose.model("course", courseSchema);

module.exports = { user, course };
