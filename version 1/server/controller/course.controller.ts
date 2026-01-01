import { Request, Response, NextFunction } from "express";
import { courseSchema } from "../../utils/zodTypes/index";
import { course, coupan } from "../Database/index";
import uploadToCloudnary from "../../utils/config/uploadToCloudnary";
import {
  TypedRequest,
  TypedRequestWithFile,
  CreateCourseRequestBody,
  UpdateCourseRequestBody,
  CreateWeekRequestBody,
  AddLessonRequestBody,
  CreateCoupanRequestBody,
  ICourse,
  IWeek,
} from "../types/index";

// Creating a course
export const createcourse = async (
  req: TypedRequestWithFile<CreateCourseRequestBody>,
  res: Response,
  next: NextFunction
): Promise<Response> => {
  try {
    const courseData = {
      ...req.body,
      price: Number(req.body.price),
    };
    const result = courseSchema.safeParse(courseData);
    if (!result.success) {
      return res.status(400).json({
        message: "invalid Input",
        error: result.error.flatten().fieldErrors,
      });
    }

    let thumbnailUrl = "";
    if (!req.file) {
      return res.status(400).json({
        message: "Please upload a thumbnail image",
      });
    }

    try {
      const uploadresult = await uploadToCloudnary(
        req.file.buffer,
        "thumbnail"
      );

      thumbnailUrl = uploadresult.secure_url;
    } catch (error) {
      console.error("Error uploading to Cloudinary:", error);
      return res.status(500).json({
        message: "Failed to upload thumbnail",
      });
    }
    const { title, description, price, category, coursehighlight } =
      result.data;

    if (!req.user) {
      return res.status(401).json({
        message: "User not authenticated",
      });
    }

    await course.create({
      title,
      description,
      price,
      category,
      coursehighlight,
      createdby: req.user,
      thumbnail: thumbnailUrl,
    });

    return res.status(200).json({
      message: "Course created successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

// Update the course details
export const updatecourse = async (
  req: TypedRequest<UpdateCourseRequestBody>,
  res: Response
): Promise<Response> => {
  try {
    const result = courseSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({
        message: "Invalid Input",
        error: result.error.flatten().fieldErrors,
      });
    }
    const courseId = req.params.id;
    if (!courseId) {
      return res.status(400).json({
        message: "Invalid Course Id",
      });
    }

    const updatedCourse = await course.findByIdAndUpdate(
      courseId,
      result.data,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedCourse) {
      return res.status(404).json({
        message: "Course not found",
      });
    }

    return res.status(200).json({
      message: "Course updated successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

// Delete a course
export const deleteCourse = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const courseId = req.params.id;
    const findCourse = await course.findByIdAndDelete(courseId);
    if (!findCourse) {
      return res.status(400).json({
        message: "course doesn't exist",
      });
    }
    return res.status(200).json({
      message: "Course deleted successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

// Get all the courses
export const getAllCourse = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const allcourses = await course.find();
    return res.status(200).json({
      courses: allcourses,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "internal server error",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

// Create week in a course
export const createWeek = async (
  req: TypedRequest<CreateWeekRequestBody>,
  res: Response
): Promise<Response> => {
  try {
    const CourseId = req.params.CourseId;
    const { weekNumber, title } = req.body;

    const CourseDoc = (await course.findById(CourseId)) as ICourse | null;
    if (!CourseDoc) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    const IsWeekExist = CourseDoc.Weeks.some(
      (w) => w.weekNumber === weekNumber
    );
    if (IsWeekExist) {
      return res.status(400).json({
        success: false,
        message: `Week ${weekNumber} already exists, create another week`,
      });
    }

    CourseDoc.Weeks.push({ weekNumber, title, lesson: [] });
    await CourseDoc.save();
    return res.status(200).json({
      success: true,
      data: CourseDoc,
      message: "Week created successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : "Internal server error",
    });
  }
};

// Add lesson to the week
export const addLessonInWeek = async (
  req: TypedRequest<AddLessonRequestBody>,
  res: Response
): Promise<Response> => {
  console.log("add lesson hit");
  try {
    const { courseId, weekNumber } = req.params;

    const { title, description, videourl } = req.body;

    const getCourseId = (await course.findById(courseId)) as ICourse | null;
    if (!getCourseId) {
      return res.status(404).json({
        message: "Course not found",
        success: false,
      });
    }

    const week = getCourseId.Weeks.find(
      (w) => w.weekNumber === Number(weekNumber)
    );
    if (!week) {
      return res.status(404).json({
        message: "Week does not exist",
        success: false,
      });
    }

    week.lesson.push({
      title,
      description,
      videourl,
      progressStatus: 0,
      isPreview: false,
    });
    await getCourseId.save();
    return res.status(200).json({
      message: "Lesson created successfully",
      success: true,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal server error",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

// Get single course data
export const getSingleCourse = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { courseId } = req.params;
    const coursedetails = await course
      .findById(courseId)
      .populate("createdby", "firstName");
    if (!coursedetails) {
      return res.status(404).json({
        message: "Course not found",
      });
    }
    return res.status(200).json({
      coursedetails,
      success: true,
      message: "Course found",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

// Create coupon for a course
export const createCoupan = async (
  req: TypedRequest<CreateCoupanRequestBody>,
  res: Response
): Promise<Response> => {
  try {
    const courseId = req.params.courseId;
    const { coupanCode, discountedPrice, TotalUsage } = req.body;
    await coupan.create({
      coupanCode,
      discountedPrice,
      TotalUsage,
    });
    return res.status(200).json({
      message: "Coupan Created Successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
