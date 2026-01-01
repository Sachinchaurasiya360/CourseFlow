import { Response } from "express";
import { user } from "../Database/index";
import { loginschema, signupSchema } from "../../utils/zodTypes/index";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import { sendEmail } from "../../utils/config/sendEmail";
import { GenerateOtp } from "../../utils/config/otpGenerator";
import { otpschema } from "../Database/index";

import {
  TypedRequest,
  LoginRequestBody,
  SignupRequestBody,
  ForgetPasswordRequestBody,
  VerifyOtpRequestBody,
  ResetPasswordRequestBody,
  JWTPayload,
  IUser,
  IOtp,
} from "../types/index";

export const loginroute = async (
  req: TypedRequest<LoginRequestBody>,
  res: Response
): Promise<Response> => {
  try {
    const result = loginschema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({
        message: "you have entered wrong input",
        error: result.error.flatten().fieldErrors,
      });
    }
    const { email, password } = result.data;
    const existinguser = (await user.findOne({
      email,
    })) as IUser | null;

    if (!existinguser) {
      return res.status(400).json({
        message: "User does not exist in database",
      });
    }

    const ispassword = await bcrypt.compare(password, existinguser.password);
    if (!ispassword) {
      return res.status(400).json({
        message: "You have entered wrong password",
      });
    }

    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      throw new Error("JWT_SECRET is not defined in environment variables");
    }

    const token = jwt.sign(
      {
        userId: existinguser._id.toString(),
        role: existinguser.role,
      } as JWTPayload,
      jwtSecret,
      {
        expiresIn: "12h",
      }
    );

    res.cookie("Cookies", token, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      maxAge: 3600000,
    });

    return res.status(200).json({
      success: true,
      message: "User login successfully",
      user: {
        id: existinguser._id.toString(),
        role: existinguser.role,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "internal server error",
    });
  }
};

export const signuproute = async (
  req: TypedRequest<SignupRequestBody>,
  res: Response
): Promise<Response> => {
  try {
    console.log("hello");
    const result = signupSchema.safeParse(req.body);
    console.log(result);
    if (!result.success) {
      return res.status(400).json({
        message: "You have sent invalid input",
        error: result.error.flatten().fieldErrors,
      });
    }
    const { email, firstName, lastName, password, role } = result.data;

    const existinguser = await user.findOne({ email });
    if (existinguser) {
      return res.status(409).json({
        message: "This email id already exist in our database",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 12);

    await user.create({
      email,
      firstName,
      lastName,
      password: hashedPassword,
      role,
    });
    return res.status(200).json({
      message: "user created successfully",
    });
  } catch (error) {
    console.error("Signup Error", error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

export const forgetPassword = async (
  req: TypedRequest<ForgetPasswordRequestBody>,
  res: Response
): Promise<Response> => {
  try {
    const { email } = req.body;
    const isEmailExist = (await user
      .findOne({ email })
      .select("firstName email")) as IUser | null;

    if (!isEmailExist) {
      return res.status(404).json({
        success: false,
        message: "Email doesn't exist",
      });
    }

    const userName = isEmailExist.firstName || "user";
    const subject = "CourseFlow: Password reset request";
    const SentOtp = GenerateOtp();
    const to = isEmailExist.email;
    const body = `
           <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
    <h2>🔐 Password Reset Request</h2>
    <p>Dear ${userName},</p>
    <p>We have received your password reset request. Please use the following One Time Password (OTP) to complete your verification:</p>
    
    <div style="font-size: 28px; font-weight: bold; margin: 20px 0; color: #4CAF50; text-align: center;">
      ${SentOtp}
    </div>
    <p>This OTP will expire in <b>5 minutes</b>. If you didn't request this, you can safely ignore this email.</p>
    
    <br>
    <p>– Team <b>CourseFlow 🚀</b></p>
           </div>
      `;

    await sendEmail({ to, subject, body });
    const hashedOtp = await bcrypt.hash(SentOtp.toString(), 12);
    await otpschema.create({
      identifier: to,
      expireAt: new Date(Date.now() + 15 * 60 * 1000),
      otp: hashedOtp,
      verified: false,
    });

    return res.status(200).json({
      message: "Otp sent to your email",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "internal server error",
    });
  }
};

export const verifyingSentOtp = async (
  req: TypedRequest<VerifyOtpRequestBody>,
  res: Response
): Promise<Response> => {
  try {
    const { identifier, otp } = req.body;
    const OtpDoc = (await otpschema.findOne({ identifier })) as IOtp | null;

    if (!OtpDoc) {
      return res.status(404).json({
        message: "OTP not found or expired",
      });
    }

    if (OtpDoc.expireAt < new Date()) {
      return res.status(400).json({
        message: "Otp has been expired",
      });
    }

    const verifyingOtp = await bcrypt.compare(otp, OtpDoc.otp);
    if (!verifyingOtp) {
      return res.status(404).json({
        message: "You have entered wrong otp",
      });
    }

    OtpDoc.verified = true;
    await OtpDoc.save();

    return res.status(200).json({
      message: "OTP verified successfully",
      success: true,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

export const resetPassword = async (
  req: TypedRequest<ResetPasswordRequestBody>,
  res: Response
): Promise<Response> => {
  try {
    const { identifier, password } = req.body;

    if (!identifier || !password) {
      return res.status(400).json({
        message: "email and password are required",
      });
    }

    const checkingOtpVerified = (await otpschema
      .findOne({ identifier })
      .select("verified _id")) as IOtp | null;

    if (!checkingOtpVerified || !checkingOtpVerified.verified) {
      return res.status(400).json({
        message: "Otp is not verified",
      });
    }

    const hashingPassword = await bcrypt.hash(password, 12);
    await user.updateOne(
      { email: identifier },
      { $set: { password: hashingPassword } }
    );

    await otpschema.deleteOne({ _id: checkingOtpVerified._id });

    return res.status(200).json({
      message: "Password updated",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
