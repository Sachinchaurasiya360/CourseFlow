const express = require("express");
const app = express();
port = 3000;
app.use(express.json());
const bcrypt = require("bcrypt");
const studentroute = require("./Routes/student");
const adminroute = require("./Routes/admin");
const cookieParser = require("cookie-parser");
app.use(cookieParser());
const publicroute = require("./Routes/public");
const cors = require("cors");
const signup = require("../backend/auth/signup");
const loginroute = require("../backend/auth/login");
const signuproute = require("../backend/auth/signup");
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());

app.post("/login", loginroute);
app.post("/signup", signuproute);

app.use("/student", studentroute);
app.use("/admin", adminroute);
app.use("/public", publicroute);

app.listen(port, () => {
  console.log("The app is running on", { port });
});
