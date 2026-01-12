import { userModel } from "../../Database/index.js";

export class ProfileServices {
  constructor() {}

  async updateProfile(email: string, data: Record<string, any>) {
    return userModel.updateOne({ email }, data);
  }

  async getUserByEmail(email:string){
    return userModel.findOne({email}).select("-password")
  }
}
