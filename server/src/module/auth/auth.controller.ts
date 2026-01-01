import Express from "express";
import type { Request, Response } from "express";
import { AuthService } from "./auth.service.js";

export class AuthController {
  constructor(private authService: AuthService) {}

  //Controller for the signin
  signin = async (req: Request, res: Response) => {
    const {email,password}=req.body
    const valid
  };
}
