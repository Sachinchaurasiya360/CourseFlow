const express = require("express");
const app = express();
port = 3000;
app.use(express.json());
const bcrypt = require("bcrypt");
const studentroute = require("./Routes/student");
const adminroute= require("./Routes/admin")
const cookieParser=require("cookie-parser")
app.use(cookieParser())
const publicroute=require('./Routes/public')
const cors=require('cors')
app.use(cors({ origin: "http://localhost:5173",
  credentials:true
 }));
 app.use(express.json())

app.use("/student", studentroute);
app.use("/admin",adminroute);
app.use('/public',publicroute)


app.listen(port, () => {
  console.log("The app is running on", { port });
});
