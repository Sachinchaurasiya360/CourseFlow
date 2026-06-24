import { Course,CourseContent } from "../../database/model/courses.js";

import { type courseCreateType,type moduleCreateTypes, type courseContentTypes } from "./course.validation.js";

export class CourseService {
  async createCourse(courseData: courseCreateType, userId: string) {
    try {
      return await Course.create({ ...courseData, createdBy: userId });
    } catch (error) {}
  }
  async updateCourse(courseData: courseCreateType) {
    try {
    } catch (error) {}
  }
  async createModule(data:moduleCreateTypes){
    return CourseContent.create(data)
  }
  async crateContentInsideModule(data:courseContentTypes){
    return 
  }
}
