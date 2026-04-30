import express from "express";
import { LoginController } from "../module/Authentication/Login/login.controller.js";
import { SignupController } from "../module/Authentication/signup/signup.controller.js";
import { LoginService } from "../module/Authentication/Login/login.service.js";
import { SignupService } from "../module/Authentication/signup/signup.service.js";

const router = express.Router();

const loginController = new LoginController(new LoginService());
const signupController = new SignupController(new SignupService());

router.post('/login', (req, res) => loginController.login(req, res));
router.post('/signup', (req, res) => signupController.signup(req, res));

// Instead of doing like that we can also bind the controller methods to the router
// router.post('/signup', signupController.signup.bind(signupController));
// We can also do like the signupController.login but the problem is that then in the controller this will be undefined 
// reason is that the bind method creates a new function and the this context is lost


export default router 