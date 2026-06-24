import mongoose from "mongoose";
import { logger } from "../utils/logger/logger.js";
import dotenv from "dotenv";
dotenv.config();

export const connectToDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI as string);
    logger.info("Database connected");
  } catch (error) {
    console.error("MongoDB connection failed", error);
    process.exit(1);
  }
};

