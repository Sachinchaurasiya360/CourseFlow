import { type Request, type Response } from "express";
import { CourseService } from "./course.service.js";
import { courseCreateValidation,  moduleCreateValidation,CourseContentvalidation } from "./course.validation.js";

export class CourseController {
  constructor(private readonly courseServices: CourseService) {}

  async createCourse(req: Request, res: Response) {
    try {
      const validateInput = courseCreateValidation.safeParse(req.body);
      if (!validateInput.success) {
        return res.status(400).json({
          message: "Invalid Input",
          success: false,
        });
      }

      const userId = req.userId;
      const createCourse = await this.courseServices.createCourse(
        validateInput.data,
        userId!,
      );
      return res.status(201).json({
        message: "Course created successful",
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
        status: false,
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
    const result= CourseContentvalidation.safeParse(req.body)
    if(!result.success){
        return res.status(400).json({
          message:"Invalid input"
, success:false
        })
    }

    const createContent= await this.courseServices.
    //name description,type video notes
  }

  async updateCourse(req: Request, res: Response) {
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
  }

  async getCourseById(req: Request, res: Response) {}
  //Implement pagination here
  async getallCourses(req: Request, res: Response) {}
  async deleteCourses(req:Request,res:Response){}
  async getAllregisterUser(req:Request,res:Response){}
  async getSingleStudentData(req:Request,res:Response){}
  async addToCart(req:Request,res:Response){}
  async getStudentPerCourses(req:Request,res:Response){}
  


}
