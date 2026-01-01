import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import mongoose from "mongodb";

export class AuthService {
  //Hashing the password before storing into the db
  async hashedPassword(password: string) {
    const saltRound = 10;
    return bcrypt.hash(password, saltRound);
  }

  //verifying the hashed password and user entered password
  async verifyPassword(password: string, email: string) {
    return;
  }
}
