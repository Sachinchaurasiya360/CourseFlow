import { CourseController } from "../module/Courses/course.controller.js";
import { CourseService } from "../module/Courses/course.service.js";
import express from "express";
const router = express.Router();
import { requiredAuth, requiredRole } from "../utils/middleware/auth.js";

const CourseControllers = new CourseController(new CourseService());
router.post("/createcourses", requiredAuth, requiredRole("ADMIN"), (req, res) =>
  CourseControllers.createCourse(req, res),
);
router.get("/getallCourses", requiredAuth, requiredRole("ADMIN"), (req, res) =>
  CourseControllers.getallCourses(req, res),
);
export default router;
