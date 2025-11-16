import express from "express";
import {
  loginroute,
  signuproute,
  forgetPassword,
  verifyingSentOtp,
  resetPassword
} from "../controller/auth.Controller";

const router = express.Router();

router.post("/login", loginroute);
router.post("/signup", signuproute);
router.patch("/forgetpassword", forgetPassword);
router.post("/verifyingSentOtp", verifyingSentOtp);
router.post("/resetPassword", resetPassword);

export default router;
