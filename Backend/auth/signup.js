const express = require("express");
const app = express();
const router = express.Router();
const { user } = require("../../Database/index");
const { signupSchema, loginschema } = require("../../Common/zod/index");
const bcrypt = require("bcrypt");
const cors = require("cors");
app.use(express.json());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

const signuproute= async (req, res) => {
  try {
    const result = signupSchema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        message: "You have sent invalid input",
        error: result.error.flatten().fieldErrors,
      });
    }
    const { email, firstName, lastName, password, role } = result.data;

    const existinguser = await user.findOne({ email });
    if (existinguser) {
      return res.status(409).json({
        message: "This email id already exist in our database",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 12);

    await user.create({
      email,
      firstName,
      lastName,
      password: hashedPassword,
      role,
    });
    return res.status(200).json({
      message: "user created succesfully",
    });
  } catch (error) {
    console.error("Signup Error", error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
module.exports = signuproute;
