import { User } from "../../../database/index.js";
import bcrypt from "bcrypt";
export class LoginService {
  
  async isEmailExists(email: string): Promise<boolean> {
    const isEmailExists = await User.findOne({ email });
    return isEmailExists ? true : false;
  }

  async comparePassword(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    const isMatch = await bcrypt.compare(password, hashedPassword);

    return isMatch;
  }

  async getUserByEmail(email: string) {
    const user = await User.findOne({email});
    return user;
  }


}
