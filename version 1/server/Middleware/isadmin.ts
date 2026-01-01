import { Response, NextFunction } from "express";
import { TypedRequest } from "../types";

export const isadmin = (
  req: TypedRequest<any>,
  res: Response,
  next: NextFunction
) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    return res.status(403).json({
      message: "Route is protected only for admin",
    });
  }
};
