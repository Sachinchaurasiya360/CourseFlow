const { isadmin } = require("../Middleware/isadmin");
const { isAuthenticated } = require("../Middleware/isAutheticated");
const { createcourse,getAllCourse } = require("../controller/course.controller");
const express = require("express");
const router = express.Router();

router.post("/createcourse", isadmin,isAuthenticated, createcourse);
router.get("/getcourse",getAllCourse)

module.exports = router;
