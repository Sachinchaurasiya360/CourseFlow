import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectdb = async (): Promise<void> => {
  try {
    const dbUrl = process.env.DATABASE_URL;
    if (!dbUrl) {
      throw new Error("DATABASE_URL is not defined in environment variables");
    }
    await mongoose.connect(dbUrl);
    console.log("Database has been connected");
  } catch (error) {
    console.log(error);
  }
};

setTimeout(() => {
  connectdb();
}, 2000); // making it so that frequent database connection call should not go to the db

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true, lowercase: true },
    firstName: { type: String, trim: true },
    LastName: String,
    password: String,
    purchesedCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: "course" }],
    role: { type: String, enum: ["student", "admin"], default: "student" },
    content: { type: String, required: true },
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

const couponSchema = new mongoose.Schema(
  {
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "course",
      required: true,
    },
    couponCode: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
      trim: true,
    },
    discountedPrice: {
      type: Number,
      required: true,
      min: 0,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    expiresAt: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: { type: String, required: true },
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
    verified: { type: Boolean, default: false },
    otp: String,
  },
  {
    timestamps: true,
  }
);

const coupanSchema = new mongoose.Schema({
  coupanCode: String,
  expireAt: Date,
  discountedPrice: Number,
  TotalUsage: Number,
  CurrentUsages: { type: Number, default: 0 },
});

// using TTL(time to live) it will automatically delete the doc after 5 min
otpSchema.index({ expireAt: 1 }, { expireAfterSeconds: 0 });

export const user = mongoose.model("user", userSchema);
export const course = mongoose.model("course", courseSchema);
export const blog = mongoose.model("blog", blogSchema);
export const otpschema = mongoose.model("otpschema", otpSchema);
export const coupan = mongoose.model("coupan", coupanSchema);
