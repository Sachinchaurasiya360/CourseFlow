const express = require("express");
const router = express.Router();
const {
  loginroute,
  signuproute,
  forgetPassword,
  verifyingSentOtp,
  resetPassword
} = require("../controller/auth.Controller.js");


router.post("/login", loginroute);
router.post("/signup", signuproute);
router.patch("/forgetpassword", forgetPassword);
router.post("/verifyingSentOtp",verifyingSentOtp);
router.post("/resetPassword",resetPassword)


module.exports = router;
