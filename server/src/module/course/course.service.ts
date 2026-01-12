import { CourseModel, ChapterModel, LessonModel, ReviewModel } from '../../Database/index.js';

export class CourseService {
  
  
    // Get all courses
  async getAllCourses() {
    try {
      return await CourseModel.find()
        .populate('instructor', 'email')
        .sort({ createdAt: -1 });
    } catch (error) {
      throw new Error('Failed to fetch courses');
    }
  }

  // Get course by ID
  async getCourseById(id: string) {
    try {
      return await CourseModel.findById(id)
        .populate('instructor', 'email');
    } catch (error) {
      throw new Error('Failed to fetch course');
    }
  }

  // Create new course
  async createCourse(courseData: any) {
    try {
      const course = new CourseModel(courseData);
      return await course.save();
    } catch (error) {
      throw new Error('Failed to create course');
    }
  }

  // Update course
  async updateCourse(id: string, updateData: any) {
    try {
      return await CourseModel.findByIdAndUpdate(
        id,
        updateData,
        { new: true, runValidators: true }
      );
    } catch (error) {
      throw new Error('Failed to update course');
    }
  }

  // Delete course
  async deleteCourse(id: string) {
    try {
      return await CourseModel.findByIdAndDelete(id);
    } catch (error) {
      throw new Error('Failed to delete course');
    }
  }

  // Get chapters for a course
  async getCourseChapters(courseId: string) {
    try {
      return await ChapterModel.find({ courseId })
        .sort({ chapterNo: 1 });
    } catch (error) {
      throw new Error('Failed to fetch chapters');
    }
  }

  // Get lessons for a chapter
  async getChapterLessons(courseId: string, chapterId: string) {
    try {
      return await LessonModel.find({ courseId, chapterId })
        .sort({ lessonNo: 1 });
    } catch (error) {
      throw new Error('Failed to fetch lessons');
    }
  }

  // Get reviews for a course
  async getCourseReviews(courseId: string) {
    try {
      return await ReviewModel.find({ courseId })
        .populate('userId', 'name email')
        .sort({ createdAt: -1 });
    } catch (error) {
      throw new Error('Failed to fetch reviews');
    }
  }

  // Add review to course
  async addReview(courseId: string, userId: string, reviewData: any) {
    try {
      const review = new ReviewModel({
        courseId,
        userId,
        ...reviewData
      });
      
      const savedReview = await review.save();
      
      // Update course rating
      await this.updateCourseRating(courseId);
      
      return savedReview;
    } catch (error) {
      throw new Error('Failed to add review');
    }
  }

  // Update course rating based on reviews
  private async updateCourseRating(courseId: string) {
    try {
      const reviews = await ReviewModel.find({ courseId });
      const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
      const averageRating = reviews.length > 0 ? totalRating / reviews.length : 0;
      
      await CourseModel.findByIdAndUpdate(courseId, {
        rating: {
          average: averageRating,
          count: reviews.length
        }
      });
    } catch (error) {
      throw new Error('Failed to update course rating');
    }
  }
}