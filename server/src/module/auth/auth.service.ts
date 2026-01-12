import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { otpModel, userModel } from "../../Database/index.js";
import crypto from "crypto";

// TODO: Add proper error handling and custom exceptions
// TODO: Implement password policy configuration
// TODO: Add audit logging for security events
// TODO: Consider using a more secure OTP generation method
export class AuthService {
  //Hashing the password before storing into the db
  // TODO: Make salt rounds configurable
  // TODO: Add password strength validation before hashing
  async hashedPassword(password: string) {
    const saltRound = 10;
    return bcrypt.hash(password, saltRound);
  }

  //verifying the hashed password and user entered password
  // TODO: Add account lockout mechanism after failed attempts
  // TODO: Log failed authentication attempts
  async verifyPassword(password: string, hashedPassword: string) {
    return bcrypt.compare(password, hashedPassword);
  }

  //Looking for the user by email in DB
  // TODO: Add user status check (active/inactive/banned)
  // TODO: Implement caching for frequently accessed users
  async findUserByEmail(email: string) {
    return userModel.findOne({ email });
  }

  //Creating a new user
  // TODO: Add transaction handling for user creation
  // TODO: Set default user roles and permissions
  // TODO: Add user creation timestamp and metadata
  async createNewUser(name: string, password: string, email: string) {
    return userModel.create({ name, password, email });
  }

  // TODO: Make token expiration configurable
  // TODO: Add refresh token mechanism
  // TODO: Include user roles/permissions in token
  async generateToken(email: string, name: string) {
    return jwt.sign(
      {
        email,
        name,
      },
      process.env.JWT_SECRET as string,
      {
        expiresIn: "1d",
      }
    );
  }

  // Generate 6-digit OTP
  // TODO: Use cryptographically secure random number generator
  // TODO: Make OTP length configurable
  // TODO: Add OTP rate limiting per user
  async generateOTP() {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  // TODO: Fix typo: 'exipireAt' should be 'expiresAt'
  // TODO: Add TTL index for automatic cleanup
  // TODO: Implement OTP cleanup job
  async saveOTP(email: string, otp: string) {
    return otpModel.create({
      email,
      otp,
      exipireAt: new Date(Date.now() + 1000 * 60 * 5),
      verified: false,
    });
  }

  // TODO: Add proper error handling and return types
  // TODO: Check OTP expiration time
  // TODO: Add method parameter types
  async isOTPExist(email:string){
    return otpModel.findOne({email, verified: false})

    
  }
  // TODO: Add proper error handling
  // TODO: Return updated document
  // TODO: Add method parameter types
  async markOTPAsVerified(email:string){
    return otpModel.updateOne({email}, {verified: true})
  }
  // TODO: Fix token expiration calculation (should be hours, not 100 minutes)
  // TODO: Add proper error handling
  // TODO: Add method parameter types
  async generateResetToken(email:string){
    const token = crypto.randomBytes(32).toString("hex");
    const tokenExpiry = new Date(Date.now()+ 100 * 60 * 60); 
    const updateResult= await otpModel.updateOne({email}, {token, tokenExpiry})
    return token;
  }

  // TODO: Add proper error handling and return types
  // TODO: Check token expiration
  // TODO: Add method parameter types
  async getUserByResetToken(token:string){
    return otpModel.findOne({token});
  }
  
  // TODO: Add transaction handling
  // TODO: Add password history to prevent reuse
  // TODO: Log password change events
  // TODO: Add method parameter types
  async updatePassword(email:string, password:string){
    return userModel.updateOne({email}, {password});
  }
  
  // TODO: Add method parameter types
  async deleteUser(email:string){
    return userModel.deleteOne({email});
  }
}
