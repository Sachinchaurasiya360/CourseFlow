import express from "express";
import { logger } from "./utils/logger/logger.ts";
import { pinoHttp } from "pino-http";
import { connectToDatabase } from "./database/index.js";
import authRouter from "./Route/authRouter.ts";
const app = express();
app.use(express.json());
const port = `3000`;

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

app.listen(port, () => {
  logger.info(`Server is running on port ${port}`);
});
