import type { Request, Response } from "express";
import { CourseService } from "./course.service.js";
import { courseCreateValidation } from "./course.validation.js";
import { success } from "zod";
export class CourseController {
  constructor(private readonly courseServices: CourseService) {}

  async createCourse(req: Request, res: Response) {
    const validateInput = courseCreateValidation.safeParse(req.body);
    if (!validateInput) {
      return res.status(400).json({
        message: "Invalid Input",
        success: false,
      });
    }
      console.log(validateInput.data)
  }

  async updateCourse(req:Request,res:Response){
    const validateInput= courseCreateValidation.safeParse(req.body)
    if(!validateInput.success){
        return res.status(400).json({
            message:"Invalid input",
            success: true
        })
    }
    const updateCourse= await this.courseServices.updateCourse(validateInput.data)
    return res.status(200).json({
        message:"Course updated",
        success:true
    })
  }

  async getCourseById (req:Request,res:Response){
    
  }


}
