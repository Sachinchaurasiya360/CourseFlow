import type { Request, Response } from "express";

export function me(req: Request, res: Response) {
  return res.status(200).json({
    success: true,
    userId: req.userId,
    role:req.role,
    name:req.name
  });
}
