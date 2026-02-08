import {  type Request, type Response } from "express";
import { AuthService } from "./auth.service.js";
import { signinSchema, signupSchema } from "../../validators/index.js";
import { sendEmail } from "../../config/email.js";

// TODO: Add rate limiting middleware to prevent brute force attacks
// TODO: Implement proper logging instead of console.error
// TODO: Add request/response DTOs for better type safety
// TODO: Add input sanitization to prevent XSS attacks

export class AuthController {
  constructor(private authService: AuthService) {}

  //Controller for the signin
  // TODO: Add account lockout after failed attempts
  // TODO: Implement refresh token mechanism
  // TODO: Add remember me functionality
  // TODO: Return user data in response for better UX
  signin = async (req: Request, res: Response) => {
    try {
      const result = signinSchema.safeParse(req.body);
      if (!result.success) {
        return res.status(400).json({
          message: "you have entered wrong input",
          error: result.error.flatten().fieldErrors,
          success: false,
        });
      }
      const { email, password } = result.data;
      const isUserExist = await this.authService.findUserByEmail(email);
      if (!isUserExist) {
        return res.status(404).json({
          message: "User not found",
          success: false,
        });
      }
      // TODO: Remove unnecessary type assertions - improve type safety
      const comparePassword = await this.authService.verifyPassword(
        password ,
        isUserExist.password as string
      );
      if (!comparePassword) {
        return res.status(401).json({
          message: "Invalid password",
          success: false,
        });
      }

      const token = await this.authService.generateToken(
        email as string,
        isUserExist.name as string
      );
      // TODO: Store token in HTTP-only cookie and consider refresh token
      // TODO: Add cookie security attributes (SameSite=Strict in production)
      res.cookie("token", token, {
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        maxAge: 24 * 60 * 60 * 1000,
      });
      // TODO: Return response with user data and token
      return res.status(200).json({
        message: "Signin successful",
        success: true,
        token,
      });
    } catch (error) {
      console.error("Signin error:", error);
      return res.status(500).json({
        message: "Internal server error",
        success: false,
      });
    }
  };

  //Controller for the signup
  // TODO: Add email verification before account activation
  // TODO: Implement account verification workflow
  // TODO: Add password strength validation
  // TODO: Consider adding welcome email
  signup = async (req: Request, res: Response) => {
    try {
      const result = signupSchema.safeParse(req.body);
      if (!result.success) {
        return res.status(400).json({
          message: "Validation failed",
          error: result.error.flatten().fieldErrors,
          success: false,
        });
      }
      const { name, email, password } = result.data;

      // Check if user already exists
      const existingUser = await this.authService.findUserByEmail(email);
      if (existingUser) {
        return res.status(409).json({
          message: "User already exists with this email",
          success: false,
        });
      }

      // Hash password and create user
      const hashedPassword = await this.authService.hashedPassword(password);
      const newUser = await this.authService.createNewUser(
        name,
        hashedPassword,
        email
      );
        // Send email to them using the redis and bull mq
        
      return res.status(201).json({
        message: "Account created successfully",
        success: true,
        data: {
          id: newUser._id,
          name: newUser.name,
          email: newUser.email,
        },
      }); 
    } catch (error) {
      console.error("Signup error:", error);
      return res.status(500).json({
        message: "Internal server error",
        success: false,
      });
    }
  };

  // TODO: Add input validation schema for forget password
  // TODO: Implement rate limiting for password reset requests
  // TODO: Add email template for password reset
  forgetPassword = async (req: Request, res: Response) => {
    try {
      const { email } = req.body;
      const isUserExist = await this.authService.findUserByEmail(email);
      if (!isUserExist) {
        return res.status(404).json({
          message: "User does not exist with this email",
          success: false,
        });
      }
      const otp = await this.authService.generateOTP();

      // TODO: Remove console.log in production - use proper logging
      console.log("For Testing Purpose: OTP has been generated", otp);

      // TODO: Handle email sending failures gracefully
      // TODO: Add transaction for OTP operations
      const sendEmailResult = await sendEmail({
        to: email,
        subject: "Password Reset",
        body: `Your OTP is ${otp}`,
      });
      const hashedOtp = await this.authService.hashedPassword(otp);
      await this.authService.saveOTP(email, hashedOtp);

      return res.status(200).json({
        message: "OTP sent successfully",
        success: true,
      });
    } catch (error) {
      console.error("Forget password error:", error);
      return res.status(500).json({
        message: "Internal server error",
        success: false,
      });
    }
  };

  // TODO: Add input validation schema for OTP verification
  // TODO: Implement OTP rate limiting
  // TODO: Add OTP expiration check
  verifyingSentOtp = async (req: Request, res: Response) => {
    const { email, otp } = req.body;
    // TODO: Fix validation logic - should check if both email and otp are provided
    if (!otp || !email) {
      return res.status(400).json({
        message: "Otp and email required ",
        success: false,
      });
    }

    const isOTPExist = await this.authService.isOTPExist(email);
    if (!isOTPExist) {
      return res.status(400).json({
        message: "OTP Expired",
        success: false,
      });
    }

    // TODO: Remove unnecessary type assertions
    const verifyOtp = await this.authService.verifyPassword(
      otp ,
      isOTPExist.otp as string
    );
    if (!verifyOtp) {
      return res.status(400).json({
        message: "Invalid OTP",
        success: false,
      });
    }

    await this.authService.markOTPAsVerified(email);
    const resetToken = await this.authService.generateResetToken(email);
    return res.status(200).json({
      message: "OTP verified successfully",
      success: true,
      resetToken,
    });
  };

  // TODO: Add input validation schema for password reset
  // TODO: Implement password strength validation
  // TODO: Add transaction for password update
  resetPassword = async (req: Request, res: Response) => {
    const { token, password, confirmPassword } = req.body;
    const getUserByRestToken = await this.authService.getUserByResetToken(
      token
    );
    if (!getUserByRestToken) {
      return res.status(400).json({
        message: "Invalid reset token",
        success: false,
      });
    }

    // TODO: Fix validation logic - should check if passwords match, not if they're different
    if (!password || !confirmPassword || password !== confirmPassword) {
      return res.status(400).json({
        message: "Password and confirm password must be same",
        success: false,
      });
    }

    const hashedPassword = await this.authService.hashedPassword(password);
    const updatePassword = await this.authService.updatePassword(
      getUserByRestToken.email as string,
      hashedPassword
    );
    return res.status(200).json({
      message: "Password reset successfully",
      success: true,
    });
  };

  // Logout controller
  // TODO: Invalidate token on server side
  // TODO: Add logout from all devices option
  logout = async (req: Request, res: Response) => {
    res.clearCookie("token");
    return res.status(200).json({
      message: "user logged out successfully",
      success: true,
    });
  };
}
