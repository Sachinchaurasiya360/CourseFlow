import type { NextFunction } from "express";
import { type Request, type Response } from "express";
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

    const secret = process.env.JWT_SECRET;
    if (!secret) throw new Error("JWT_SECRET is not defined");

    const payload = Jwt.verify(token, secret) as unknown as { id: string; role: string; name: string };

    req.userId = payload.id;
    req.role = payload.role;
    req.name = payload.name;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid token",
    });
  }
}

export function requiredRole(role: "STUDENT" | "ADMIN") {
  return (req: Request, res: Response, next: NextFunction) => {
    if (req.role !== role) {
      return res.status(403).json({
        success: false,
        message: "Forbidden",
      });
    }

    next();
  };
}
