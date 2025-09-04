const express = require("express");
const app = express();
const router = express.Router();
const { user } = require("../../Database/index");
const { loginschema } = require("../../Common/zod/index");
const bcrypt = require("bcrypt");
const cors = require("cors");
const jwt=require('jsonwebtoken')
app.use(express.json());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));


const loginroute= async (req, res) => {
  try {
    const result = loginschema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({
        message: "you have entered wrong input",
        error: result.error.flatten().fieldErrors,
      });
    }
    const { email, password } = result.data;
    const existinguser = await user.findOne({
      email,
    });
    if (!existinguser) {
      return res.status(404).json({
        message: "User does not exist in database",
      });
    }
    const ispassword = await bcrypt.compare(password, existinguser.password);
    if (!ispassword) {
      return res.status(400).json({
        message: "You have entered wrong passwrod",
      });
    }
    const token = await jwt.sign(
      { userId: existinguser._id, role: existinguser.role },
      process.env.JWT_SECRET,
      {
        expiresIn: "5h",
      }
    );

    res.cookie("Cookies", token, {
      httpOnly: true,
      sameSite: "lax", //there are 3 types of it
      secure: process.env.NODE_ENV,
      maxAge: 360000000,
    });
    return res.status(200).json({
      message: "User login succesfully",
      token,
      user: {
        id: existinguser._id,
        role: existinguser.role,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "internal server error",
    });
  }
};

module.exports = loginroute;