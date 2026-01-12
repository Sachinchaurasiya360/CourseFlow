import { CourseService } from './course.service.js';
import type { Request, Response } from 'express';

export class CourseController {
  constructor(private courseService: CourseService) {}

  // Get all courses
  getAllCourses = async (req: Request, res: Response) => {
    try {
      const courses = await this.courseService.getAllCourses();
      return res.status(200).json({
        success: true,
        data: courses,
        message: 'Courses retrieved successfully'
      });
    } catch (error) {
      console.error('Get all courses error:', error);
      return res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  };

  // Get course by ID
  getCourseById = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const course = await this.courseService.getCourseById(id) ;
      
      if (!course) {
        return res.status(404).json({
          success: false,
          message: 'Course not found'
        });
      }

      return res.status(200).json({
        success: true,
        data: course,
        message: 'Course retrieved successfully'
      });
    } catch (error) {
      console.error('Get course by ID error:', error);
      return res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  };

  // Create new course
  createCourse = async (req: Request, res: Response) => {
    try {
      const courseData = req.body;
      const newCourse = await this.courseService.createCourse(courseData);
      
      return res.status(201).json({
        success: true,
        data: newCourse,
        message: 'Course created successfully'
      });
    } catch (error) {
      console.error('Create course error:', error);
      return res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  };

  // Update course
  updateCourse = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const updateData = req.body;
      
      const updatedCourse = await this.courseService.updateCourse(id, updateData);
      
      if (!updatedCourse) {
        return res.status(404).json({
          success: false,
          message: 'Course not found'
        });
      }

      return res.status(200).json({
        success: true,
        data: updatedCourse,
        message: 'Course updated successfully'
      });
    } catch (error) {
      console.error('Update course error:', error);
      return res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  };

  // Delete course
  deleteCourse = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      
      const deletedCourse = await this.courseService.deleteCourse(id);
      
      if (!deletedCourse) {
        return res.status(404).json({
          success: false,
          message: 'Course not found'
        });
      }

      return res.status(200).json({
        success: true,
        data: deletedCourse,
        message: 'Course deleted successfully'
      });
    } catch (error) {
      console.error('Delete course error:', error);
      return res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  };
}