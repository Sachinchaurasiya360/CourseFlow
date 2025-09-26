const express = require("express");
const app = express();
const dotenv = require("dotenv");
const authRoute = require("./Routes/auth");
const course = require("./Routes/course");

app.use(express.json());
const cookieParser = require("cookie-parser");
app.use(cookieParser());
const cors = require("cors");
dotenv.config();
app.use(
  cors({
    origin: ["http://localhost:5173", "https://courseflow-nu.vercel.app/"],
    credentials: true,
  })
);

//Testing the server health
app.get("/", (req, res) => {
  return res.status(200).json({
    success: true,
    message: "server is healthy and running",
  });
});

//Redirecting the user
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/course", course);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
