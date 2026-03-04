import express from "express";
import { LoginController } from "../module/Authentication/Login/login.controller.ts";
import { SignupController } from "../module/Authentication/signup/signup.controller.js";
import { LoginService } from "../module/Authentication/Login/login.service.js";
import { SignupService } from "../module/Authentication/signup/signup.service.js";

const router = express.Router();

const loginController = new LoginController(new LoginService());
const signupController = new SignupController(new SignupService());

router.post('/login', (req, res) => loginController.login(req, res));
router.post('/signup', (req, res) => signupController.signup(req, res));




export default router 