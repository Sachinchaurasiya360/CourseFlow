import jwt from "jsonwebtoken";
import { Response, NextFunction } from "express";
import { user } from "../Database";
import { TypedRequest, JWTPayload } from "../types";

export const isAuthenticated = async (
  req: TypedRequest<any>,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies?.Cookies;
    if (!token) {
      return res.status(401).json({
        message: "Unauthorize:No token found",
      });
    }

    const JWT_SECRET = process.env.JWT_SECRET;
    if (!JWT_SECRET) {
      return res.status(500).json({
        message: "JWT_SECRET is not configured",
      });
    }

    const decode = jwt.verify(token, JWT_SECRET) as JWTPayload;
    const verifiedUser = await user.findById(decode.userId).select("-password");
    console.log("from the middleware", verifiedUser);

    if (!verifiedUser) {
      return res.status(401).json({
        message: "user does not exist",
      });
    }

    req.user = verifiedUser as any;
    next();
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
