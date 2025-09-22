const mongoose = require("mongoose");
const { String } = require("mongoose/lib/schema/index");
require("dotenv").config();
const connectdb = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URL);
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
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
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
  author: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  coverImage: {
    require: false,
    type: String,
  },
  published: Boolean,
  publishedAt: String,
});
const otpSchema = new mongoose.Schema(
  {
    identifier: String,
    expireAt: Date,
    verifed: { type: Boolean, default: false },
    otp:String
  },
  {
    timestamps: true,
  }
);

//using TTL(time to live) it will autometically delete the doc after 5 min
otpSchema.index({expireAt:1},{expireAfterSeconds:0})

const user = mongoose.model("user", userSchema);
const course = mongoose.model("course", courseSchema);
const blog = mongoose.model("blog", blogSchema);
const coupan = mongoose.model("coupan", coupanSchema);
const otp = mongoose.model("otp", otpSchema);

module.exports = { user, course, blog, coupan, otp };
