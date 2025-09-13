const express = require("express");
const app = express();
const { user } = require("../../Database/index");
const { loginschema,signupSchema } = require("../../utils/zodTypes/index");
const bcrypt = require("bcrypt");
const cors = require("cors");
const jwt=require('jsonwebtoken');
const sendEmail=require("../../utils/config/sendEmail")
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
const forgetPassword=async(req,res)=>{
  const {email}=req.body
  const isEmailExist=await user.findOne(email)
  if(!isEmailExist){
    return res.status(500).json({
      success:false,
      message:"Email doesn't exist"
    })

  }

  
  
}

// router.get("/me", isAuthenticated, async (req, res) => {
//   try {
//     const currentuser = await user.findById(req.user.id).select("-password");
//     return res.status(200).json({
//       message: currentuser,
//     });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({
//       message: error.response?.data?.message,
//     });
//   }
// });
module.exports= {loginroute,signuproute,forgetPassword}