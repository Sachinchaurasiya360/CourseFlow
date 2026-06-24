import type { Request, Response } from "express";
import { logger } from "../../../utils/logger/logger.js";
import { SignupService } from "./signup.service.js";
import { signupValidation } from "./signup.validation.js";
export class SignupController {
  constructor(private readonly signupService: SignupService) {}

  async signup(req: Request, res: Response) {
    try {
      const validationResult = signupValidation.safeParse(req.body);
      logger.info(validationResult.data)
      if (!validationResult.success) {
        return res.status(400).json({
          success: false,
          message: "Validation failed",
          errors: validationResult.error.flatten().fieldErrors  ,
        });
      }
      const { name, email, password } = validationResult.data;
      const isUserExist = await this.signupService.isEmailUnique(email);
      if (isUserExist) {
        return res.status(409).json({
          success: false,
          message: "User already exists",
        });
      }
      const hashedPassword = await this.signupService.hashPassword(password);
      const result = await this.signupService.createUser(
        name,
        email,
        hashedPassword,
      );
      
      return res.status(201).json({
        success: true,
        message: "User created successfully",
      });
    } catch (error) {
      return res.status(500).json({
        message:"Internal server error",
        success:false
      })
      
    }
  }
}
