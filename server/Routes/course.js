const { isadmin } = require("../Middleware/isadmin");
const { isAuthenticated } = require("../Middleware/isAutheticated");
const { createcourse } = require("../controller/course.controller");
const express = require("express");
const router = express.Router();

router.post("/createcourse", isadmin,isAuthenticated, createcourse);

module.exports = router;
