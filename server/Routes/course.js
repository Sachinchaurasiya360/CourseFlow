const { isadmin } = require("../Middleware/isadmin");
const { isAuthenticated } = require("../Middleware/isAutheticated");
const {
  createcourse,
  getAllCourse,
  getSingleCourse,
} = require("../controller/course.controller");
const express = require("express");
const router = express.Router();

router.post("/createcourse", isadmin, isAuthenticated, createcourse);
router.get("/getcourse", getAllCourse);
router.get("/getsinglecourse/:courseId", getSingleCourse);

module.exports = router;
