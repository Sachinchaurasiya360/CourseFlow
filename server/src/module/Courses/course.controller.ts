import { type Request, type Response } from "express";
import { CourseService } from "./course.service.js";
import {
  courseCreateValidation,
  moduleCreateValidation,
  CourseContentvalidation,
} from "./course.validation.js";
import { success } from "zod";

export class CourseController {
  constructor(private readonly courseServices: CourseService) {}
  async createCourse(req: Request, res: Response) {
    try {
      const validateInput = courseCreateValidation.safeParse(req.body);
      if (!validateInput.success) {
        return res.status(400).json({
          message: "Invalid Input",
          success: false,
          error: validateInput.error.flatten().fieldErrors,
        });
      }

      const userId = req.userId;
      console.log(userId);
      const createCourse = await this.courseServices.createCourse(
        validateInput.data,
        userId!,
      );

      return res.status(201).json({
        message: "Course created successful",
        success: true,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Internal server error",
        status: false,
      });
    }
  }

  //create Module inside the courses
  async createModule(req: Request, res: Response) {
    try {
      const result = moduleCreateValidation.safeParse(req.body);
      if (!result.success) {
        return res.status(401).json({
          message: "Invalid Input",
          status: false,
          error: result.error.flatten().fieldErrors,
        });
      }

      const createModules = await this.courseServices.createModule(result.data);
      return res.status(201).json({
        message: "Module created",
        status: true,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Internal server error",
        success: false,
      });
    }
  }

  //create content inside the module
  async createContentInsideModule(req: Request, res: Response) {
    try {
      const result = CourseContentvalidation.safeParse(req.body);
      if (!result.success) {
        return res.status(400).json({
          message: "Invalid input",
          success: false,
        });
      }

      const createContent = await this.courseServices.crateContentInsideModule(
        result.data,
      );
      return res.status(201).json({
        message: "Content Created",
        status: true,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Internal server error",
        success: false,
      });
    }
    //name description,type video notes
  }

  async updateCourse(req: Request, res: Response) {
    try {
      const validateInput = courseCreateValidation.safeParse(req.body);
      if (!validateInput.success) {
        return res.status(400).json({
          message: "Invalid input",
          success: true,
        });
      }
      const updateCourse = await this.courseServices.updateCourse(
        validateInput.data,
      );
      return res.status(200).json({
        message: "Course updated",
        success: true,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Internal server error",
        success: false,
      });
    }
  }

  async getCourseById(req: Request, res: Response) {
    try {
      const courseId = req.params.courseId!
      if(!courseId){
        return
      }
      const getCourse= await this.courseServices.getCourse(courseId)
      return res.status(200).json({
        message:"Course Details",
        success:true,
        CourseDetails: getCourse
      })
    } catch (error) {
      return res.status(500).json({
        message:"Internal server error",
        success:false
      })
    }
  }
  //Implement pagination here

  async getallCourses(req: Request, res: Response) {
    try {
      const userId = req.userId!;
      console.log(userId);
      const getCourses = await this.courseServices.getAllCourses(userId);
      return res.status(200).json({
        message: "Courses",
        success: true,
        result: getCourses,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Internal server error",
        success: false,
      });
    }
  }
  async deleteCourses(req: Request, res: Response) {
    try {
      const courseId= req.body.courseId

      const deleteCourse= await  this.courseServices.deleteCourse(courseId)
      return res.status(200).json({
        message:"course Deleted",
        success:true
      })
      
    } catch (error) {
      return res.status(500).json({
        message:"Internal server error",
        success:false
      })
      
    }
  }
  async getSingleStudentData(req: Request, res: Response) {
    try {
      const studentId= req.body.studentId

      const getStudent= await this.courseServices.getStudent(studentId

      )

      return res.status(200).json({
        message:"User Details",
        success:true,
        userDetails:getStudent
      })
      
    } catch (error) {
      return res.status(500).json({
        message:"Internal server error",
        succes:false
      })
      
    }
  }
  async addToCart(req: Request, res: Response) {
    const 
    
  }
  async getStudentPerCourses(req: Request, res: Response) {}
}
