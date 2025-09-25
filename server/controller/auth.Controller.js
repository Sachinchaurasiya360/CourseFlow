const express = require("express");
const app = express();
const { user } = require("../../Database/index");
const { loginschema, signupSchema } = require("../../utils/zodTypes/index");
const bcrypt = require("bcrypt");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const { sendEmail } = require("../../utils/config/sendEmail");
const { GenerateOtp } = require("../../utils/config/otpGenerator");
const { otp } = require("../../Database/index");
app.use(express.json());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

const loginroute = async (req, res) => {
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
const signuproute = async (req, res) => {
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

const forgetPassword = async (req, res) => {
  try {
    const { email } = req.body;
    console.log(email);
    const isEmailExist = await user.findOne({ email }).select("-password");
    if (!isEmailExist) {
      return res.status(500).json({
        success: false,
        message: "Email doesn't exist",
      });
    }
    const userName = isEmailExist.firstName;
    const subject = "CourseFlow: Password reset request";
    const SentOtp = GenerateOtp();
    const to = isEmailExist.email;
    const body = `Dear ${userName} we have received your password reset request. Your Otp is ${SentOtp}
    <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
        <h2>🔐 Verify your account</h2>
        <p>Use the following One Time Password (OTP) to complete your verification:</p>
        <div style="font-size: 24px; font-weight: bold; margin: 20px 0; color: #4CAF50;">
          ${otp}
        </div>
        <p>This OTP will expire in <b>5 minutes</b>. If you didn’t request this, you can ignore this email.</p>
        <br>
        <p>– Team CourseFlow 🚀</p>
      </div>`;
    const sendEmailForForgetPass = await sendEmail(to, subject, body);
    const hashedOtp = await bcrypt.hash(SentOtp, salt); //better to generate salt
    const savingOtpInDb = await otp.create({
      identifier: to,
      expireAt: new Date(Date.now() + 5 * 60 * 1000),
      Otp: hashedOtp,
      verifed: false,
    });

    return res.status(200).json({
      message: "Otp sent to your email ",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "internal server error",
    });
  }
};

const verifyForgotPassword = async (req, res) => {
  try {
    const { identifier, otp } = req.body;
    const OtpDoc = await otp.findOne({ identifier }).sort({ createdAt: -1 });
    const verifyingOtp = await bcrypt.compare(otp, OtpDoc.otp);
    if (!verifyingOtp) {
      return res.status(404).json({
        message: "You have enter wrong otp",
      });
    }
    //make the status false
  } catch (error) {
    console.error();
  }
};

const whoAmI = async (req, res) => {
  try {
    const currentuser = await user.findById(req.user.id).select("-password");
    return res.status(200).json({
      message: currentuser,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: error.response?.data?.message,
    });
  }
};
module.exports = {
  loginroute,
  signuproute,
  forgetPassword,
  whoAmI,
  verifyForgotPassword,
};
