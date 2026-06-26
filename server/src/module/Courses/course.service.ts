import { Course, CourseModule,courseContent} from "../../database/model/courses.js";
import { User } from "../../database/model/users.js";
import {
  type courseCreateType,
  type moduleCreateTypes,
  type courseContentTypes,
} from "./course.validation.js";

export class CourseService {
  async createCourse(courseData: courseCreateType, userId: string) {
    return await Course.create({ ...courseData, createdBy: userId });
  }
  async updateCourse(courseData: courseCreateType) {}

  async createModule(data:moduleCreateTypes){
    return CourseModule.create(data)
  }
  async crateContentInsideModule(data: courseContentTypes) {
    
    return courseContent.create(data)
  }

  async getCourse(courseId:string){
    return Course.findById(courseId)
  }
  async getAllCourses(userid: string) {
    const getallCourse = Course.find({
      createdBy: userid,
    });

    return getallCourse;
  }


  async deleteCourse(courseId:string){
    return Course.findByIdAndDelete(courseId)
  }

  async getStudent(studentId:string){
    return User.findById(studentId)
  }
}






