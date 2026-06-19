import { Course } from "../../database/index.js";
import {  type courseCreateValidationType } from "./course.validation.js";

export class CourseService {
  async createCourse(courseData: courseCreateValidationType) {
    try {
      return await Course.create(courseData);
    } catch (error) {
      throw error;
    } 
  }
  async updateCourse(courseData:courseCreateValidationType){
    try {
    } catch (error) {
        
    }
  }
}
