import jwt from "jsonwebtoken";
import { LoginService } from "./login.service.js";
import { loginValidation } from "./login.validation.js";
import type { Request, Response } from "express";
import { logger } from "../../../utils/logger/logger.js";


//impliment the signin with google in the future
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  async login(req: Request, res: Response) {
    try {
      logger.info("hello")
      const validationResult = loginValidation.safeParse(req.body);
      if (!validationResult.success) {
        return res.status(400).json({
          success: false,
          message: "Validation failed",
          errors: validationResult.error,
        });
      }
      const { email, password } = validationResult.data;

      const getUser = await this.loginService.getUserByEmail(email);
      if (!getUser) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }
      const isPasswordMatch = await this.loginService.comparePassword(
        password,
        getUser.password as string,
      );
      if (!isPasswordMatch) {
        return res.status(401).json({
          success: false,
          message: "Invalid password",
        });
      }
      const token = jwt.sign(
        {
          email: getUser.email,
          name: getUser.name,
        },
        process.env.JWT_SECRET || "DefaultSecretKey",
        {
          expiresIn: "24h",
        },
      );

      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 24 * 60 * 60 * 1000, // 24 hours
      });

      return res.status(200).json({
        success: true,
        message: "Login successful",
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  }
}
