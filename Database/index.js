const mongoose = require("mongoose");
const { int, string } = require("zod");
require("dotenv").config();
const connectdb = async () => {
  try {
    await mongoose.connect(process.env.Databaseurl);
    console.log("connected ");
  } catch (error) {}
};
connectdb();
const userSchema = new mongoose.Schema({
  email: String,
  firstName: String,
  LastName: String,
  password: String,
  purchesedCourses: [String],
  role: { type: string, enum: ["student", "admin"], default: "student" }
});

const courseSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: { type: Number, require: true },
  category: String,
  createdby: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  createdAt: { type: Date, default: Date.now() },
});

const user = mongoose.model("user", userSchema);
const course = mongoose.model("course", courseSchema);
module.exports = { user, course };
