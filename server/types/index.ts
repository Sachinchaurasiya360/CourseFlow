import { Request } from "express";
import { Document } from "mongoose";

// User interface extending Mongoose Document
export interface IUser extends Document {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  purchasedCourses: string[];
  role: "student" | "admin";
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

// OTP schema interface
export interface IOtp extends Document {
  _id: string;
  identifier: string;
  otp: string;
  expireAt: Date;
  verified: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Request bodies
export interface LoginRequestBody {
  email: string;
  password: string;
}

export interface SignupRequestBody {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  role: "student" | "admin";
}

export interface ForgetPasswordRequestBody {
  email: string;
}

export interface VerifyOtpRequestBody {
  identifier: string;
  otp: string;
}

export interface ResetPasswordRequestBody {
  identifier: string;
  password: string;
}

// Extended Request types for typed request bodies
export interface TypedRequest<T> extends Request {
  body: T;
  user?: IUser;
}

export interface emailTypes {
  to: string;
  subject: string;
  body: string;
}
// JWT Payload
export interface JWTPayload {
  userId: string;
  role: "student" | "admin";
}

// Authenticated user for cookies
export interface AuthenticatedUser {
  id: string;
  role: "student" | "admin";
}

// Course Content/Lesson interface
export interface ICourseContent {
  title: string;
  description: string;
  videourl: string;
  progressStatus: number;
  isPreview: boolean;
}

// Week interface
export interface IWeek {
  weekNumber: number;
  title: string;
  lesson: ICourseContent[];
}

// Course interface extending Mongoose Document
export interface ICourse extends Document {
  _id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  createdby: string;
  thumbnail: string;
  coursehighlight: string[];
  Weeks: IWeek[];
  createdAt: Date;
  updatedAt: Date;
}

// Coupon interface extending Mongoose Document
export interface ICoupon extends Document {
  _id: string;
  courseId: string;
  couponCode: string;
  discountedPrice: number;
  isActive: boolean;
  expiresAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

// Coupan (legacy) interface
export interface ICoupan extends Document {
  _id: string;
  coupanCode: string;
  expireAt: Date;
  discountedPrice: number;
  TotalUsage: number;
  CurrentUsages: number;
}

// Course Request Bodies
export interface CreateCourseRequestBody {
  title: string;
  description: string;
  price: number;
  category?: string;
  coursehighlight?: string[];
}

export interface UpdateCourseRequestBody {
  title?: string;
  description?: string;
  price?: number;
  category?: string;
  coursehighlight?: string[];
}

export interface CreateWeekRequestBody {
  weekNumber: number;
  title: string;
}

export interface AddLessonRequestBody {
  title: string;
  description: string;
  videourl: string;
}

export interface CreateCoupanRequestBody {
  coupanCode: string;
  discountedPrice: number;
  TotalUsage: number;
}

export interface RequestWithFile extends Request {
  file?: Express.Multer.File;
  user?: string;
}

export interface TypedRequestWithFile<T> extends RequestWithFile {
  body: T;
}
