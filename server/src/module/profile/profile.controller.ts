import { ProfileServices } from "./profile.service.js";
import { signupSchema } from "../../validators/index.js";
import { type Request, type Response } from "express";
export class ProfileController {
  constructor(private readonly profileServices: ProfileServices) {}

  updateProfile = async (req: Request, res: Response): Promise<Response> => {
    try {
      const result = signupSchema.safeParse(req.body);
      if (!result.success) {
        return res.status(400).json({
          message: "you have entered wrong input",
          error: result.error.flatten().fieldErrors,
          success: false,
        });
      }
      const updateProfile = await this.profileServices.updateProfile(
        result.data.email as string,
        result.data
      ); // positional arguments
      // const updateProfile= await this.profileServices.updateProfile(email: result.data.email as string, data: result.data) // Named arguments

      return res.status(200).json({
        message: "Profile updated successfully",
        success: true,
        data: updateProfile,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Internal server error",
        success: false,
      });
    }
  };

  me = async (req: Request, res: Response) => {
    try {
      const getUser = await this.profileServices.getUserByEmail(req.body.email);
      if (!getUser) {
        return res.status(404).json({
          message: "User not found",
          success: false,
        });
      }
      return res.status(200).json({
        message: "User fetched successfully",
        success: true,
        data: getUser,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Internal server error",
        success: false,
      });
    }
  };
}
