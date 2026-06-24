import type { NextFunction } from "express";
import { type Request, type response } from "express";
import Jwt from "jsonwebtoken";
export function requiredAuth(req: Request, res: Response, next: NextFunction) {
  try {
    const token = req.cookies?.token;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }
    const payload = Jwt.verify(token, process.env.JWT_SECRET) as { id: string };
    req.userId= payload.id
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid token",
    });
  }
}
