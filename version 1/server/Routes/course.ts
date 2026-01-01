import express from "express";
import { isadmin } from "../Middleware/isadmin";
import { isAuthenticated } from "../Middleware/isAutheticated";
import {
  createcourse,
  getAllCourse,
  getSingleCourse,
} from "../controller/course.controller";

const router = express.Router();

router.post("/createcourse", isadmin, isAuthenticated, createcourse);
router.get("/getcourse", getAllCourse);
router.get("/getsinglecourse/:courseId", getSingleCourse);

export default router;
