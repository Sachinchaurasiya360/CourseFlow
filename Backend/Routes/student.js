const express = require("express");
const router = express.Router();
const { user } = require("../../Database/index");
const { signupSchema, loginschema } = require("../../Common/zod/index");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//Insted of writing all the code here we can use MVC architechture for better modularity
router.post("/signup", async (req, res) => {
  try {
    const result = signupSchema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        message: "You have sent invalid input",
        error: result.error.flatten().fieldErrors,
      });
    }
    const { email, firstName, lastName, password } = result.data;

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
});

router.post("/login", async (req, res) => {
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
      { userId: existinguser._id },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );
    res.cookie("Cookies", token, {
      httpOnly: true,
      sameSite: "lax", //there are 3 types of it
      secure: process.env.NODE_ENV,
      maxAge: 360000,
    });
    return res.status(200).json({
      message: "User login succesfully",
      token,
      user: {
        id: existinguser._id,
        email: existinguser.email,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "internal server error",
    });
  }
});

module.exports = router;
