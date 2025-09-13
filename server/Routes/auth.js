const express = require("express");
const router = express.Router();
const {
  loginroute,
  signuproute,
  forgetPassword,
} = require("../controller/auth.Controller.js");

router.post("/login", loginroute);
router.post("/signup", signuproute);
router.patch("/forgetpassword", forgetPassword);

module.exports = router;
