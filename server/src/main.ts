import express from "express";
import { logger } from "./utils/logger/logger.js";
import { pinoHttp } from "pino-http";
import { connectToDatabase } from "./database/index.js";
import authRouter from "./Route/authRouter.js";
import cookieParser from "cookie-parser";
import courseRoute from "./Route/adminRoute.js"
import cors from 'cors'
const app = express();

const port = `3000`;
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}))
app.use(express.json());
app.use(cookieParser())
app.use(
  pinoHttp({
    logger,
  }),
);

app.get("/health", (req, res) => {
  return res.status(200).json({
    message: "Server is healthy and running",
  });
});

async function connectToDatabaseAndStartServer() {
  try {
    await connectToDatabase();
    logger.info("Database connected successfully");
  } catch (error) {
    logger.error("Failed to connect to the database");
  }
}

connectToDatabaseAndStartServer();

app.use("/api/v1/auth", authRouter);
// app.use("api/dashboard/student")
app.use("/api/v1/courseRoute",courseRoute)


app.listen(port, () => {
  logger.info(`Server is running on port ${port}`);
});
