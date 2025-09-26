const express = require("express");
const app = express();
const { user } = require("../../Database/index");
const { loginschema, signupSchema } = require("../../utils/zodTypes/index");
const bcrypt = require("bcrypt");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const { sendEmail } = require("../../utils/config/sendEmail");
const { GenerateOtp } = require("../../utils/config/otpGenerator");
const { otpschema } = require("../../Database/index");
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
    const isEmailExist = await user
      .findOne({ email })
      .select("firstName email");
    if (!isEmailExist) {
      return res.status(404).json({
        success: false,
        message: "Email doesn't exist",
      });
    }
    const userName = isEmailExist.firstName || "user";
    const subject = "CourseFlow: Password reset request";
    const SentOtp = GenerateOtp();
    const to = isEmailExist.email;
    const body = `
           <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
    <h2>🔐 Password Reset Request</h2>
    <p>Dear ${userName},</p>
    <p>We have received your password reset request. Please use the following One Time Password (OTP) to complete your verification:</p>
    
    <div style="font-size: 28px; font-weight: bold; margin: 20px 0; color: #4CAF50; text-align: center;">
      ${SentOtp}
    </div>
    <p>This OTP will expire in <b>5 minutes</b>. If you didn’t request this, you can safely ignore this email.</p>
    
    <br>
    <p>– Team <b>CourseFlow 🚀</b></p>
           </div>
      `;

    const sendEmailForForgetPass = await sendEmail(to, subject, body);
    const hashedOtp = await bcrypt.hash(SentOtp.toString(), 12); //better to generate salt
    const savingOtpInDb = await otpschema.create({
      identifier: to,
      expireAt: new Date(Date.now() + 15 * 60 * 1000),
      otp: hashedOtp,
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

const verifyingSentOtp = async (req, res) => {
  try {
    const { identifier, otp } = req.body;
    const OtpDoc = await otpschema.findOne({ identifier });
    if (!OtpDoc) {
      return res.status(404).json({
        message: "OTP not found or expired",
      });
    }
    if (OtpDoc.expireAt < Date.now()) {
      return res.status(400).json({
        message: "Otp has been expired",
      });
    }

    const verifyingOtp = await bcrypt.compare(otp, OtpDoc.otp);
    if (!verifyingOtp) {
      return res.status(404).json({
        message: "You have enter wrong otp",
      });
    }

    verifyingOtp.verifed = true;
    await OtpDoc.save();
    return res.status(200).json({
      message: "OTP verified successfully",
      success: true,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};
const resetPassword = async (req, res) => {
  try {
    const { identifier, password } = req.body;
    if (!identifier || password) {
      return res.status(404).json({
        message: "email and password are required",
      });
    }
    const checkingOtpVerifed = await OtpDoc.findOne({ identifier }).select(
      "verifed _id"
    );
    if (!checkingOtpVerifed || checkingOtpVerifed.verifed) {
      return res.status(400).json({
        message: "Otp is not verifed",
      });
    }
    const hasingPassword = await bcrypt.hash(password, 12);
    const updatingPassword = await user.updateOne(
      { email },
      { $set: { password: hasingPassword } }
    );
    await otpschema.deleteOne({ _id: checkingOtpVerifed });
    return res.status(200).json({
      message: "Password updated",
    });
  } catch (error) {
    console.error(error)
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};


module.exports = {
  loginroute,
  signuproute,
  forgetPassword,
  verifyingSentOtp,
  resetPassword
};
