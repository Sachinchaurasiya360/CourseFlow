import express, { Request, Response } from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRoute from "./Routes/auth";
import courseRoute from "./Routes/course";
import "./Database";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  })
);

// Testing the server health
app.get("/", (req: Request, res: Response) => {
  return res.status(200).json({
    success: true,
    message: "server is healthy and running",
  });
});

// Redirecting the user
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/course", courseRoute);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
