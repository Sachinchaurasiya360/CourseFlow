const mongoose = require("mongoose");
const { lowercase, trim } = require("zod");
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
  { timestamp: true }
);

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
    createdAt: { type: Date, default: Date.now() },
  },
  { timestamps: true }
);

const user = mongoose.model("user", userSchema);
const course = mongoose.model("course", courseSchema);
module.exports = { user, course };
