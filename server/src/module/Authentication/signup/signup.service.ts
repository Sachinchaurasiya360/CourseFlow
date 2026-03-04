import bcrypt from "bcrypt";
import { User } from "../../../database/index.js";

export class SignupService {
    
  async hashPassword(password: string): Promise<string> {
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  }

  async isEmailUnique(email: string): Promise<boolean> {
    const isEmailExists = await User.exists({ email });
    return isEmailExists;
  }
  async createUser(name: string, email: string, password: string) {
    const createdUser = await User.create({
      name,
      email,
      password,
    });
    return createdUser;
  }
}
