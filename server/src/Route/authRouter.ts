import express from "express";
import { LoginController } from "../module/Authentication/Login/login.controller.js";
import { SignupController } from "../module/Authentication/signup/signup.controller.js";
import { LoginService } from "../module/Authentication/Login/login.service.js";
import { SignupService } from "../module/Authentication/signup/signup.service.js";
import { me } from "../module/Authentication/me.js";
import { requiredAuth } from "../utils/middleware/auth.js";
const router = express.Router();

const loginController = new LoginController(new LoginService());
const signupController = new SignupController(new SignupService());

router.post('/login', (req, res) => loginController.login(req, res));
router.post('/signup', (req, res) => signupController.signup(req, res));
router.get('/me', requiredAuth, me)

export default router 