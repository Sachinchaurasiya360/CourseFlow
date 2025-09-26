const express = require("express");
const { courseSchema } = require("../../utils/zodTypes/index");
const { course, coupan } = require("../../Database/index");
const cors = require("cors");
const app = express();
const multer = require("multer");
const storage = multer.memoryStorage();

app.use(express.json());
app.use(
  cors({
    origin: "https://localhost/5173",
    Credential: true,
  })
);

//Creating a course

const createcourse = async (req, res, next) => {
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
    const createcourse = await course.create({
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

//update the course details
const updatecourse = async (req, res) => {
  try {
    const result = courseSchema.safeParse(req.body);
    if (!result) {
      return res.status(400).json({
        message: "Invalid Input",
        error: result.error.flatten().fieldErrors,
      });
    }
    const courseId = req.params.id;
    const updatecourse = await course.findByIdAndUpdate(courseId, result.data, {
      new: true,
      runValidators: true,
    });
    if (!courseId) {
      return res.status(400).json({
        message: "Invalid Course Id",
      });
    }
    return res.status(200).json({
      message: "Course update sucessfully ",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
//Delete a course

const deleteCourse = async (req, res) => {
  try {
    const courseId = req.params.id;
    const findCourse = await course.findByIdAndDelete(courseId);
    if (!findCourse) {
      return res.status(400).json({
        message: "course doesn't exist",
      });
    }
    return res.status(200).json({
      message: "Couse deleted successfully",
    });
  } catch (error) {
    console.error(Error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

//Get all the course
const getAllCourse = async (req, res) => {
  try {
    const allcourses = await course.find();
    return res.status(200).json({
      courses: allcourses,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "internal server error",
      message: error.message,
    });
  }
};

//create content of the course

const createWeek = async (req, res) => {
  try {
    const CourseId = req.params.CourseId;
    const { weekNumber, title } = req.body;

    const CourseDoc = await course.findById(getCourseId);
    if (!CourseDoc) {
      throw new Error("Course not found");
    }

    const IsWeekExist = await CourseDoc.Weeks.some(
      (w) => w.weekNumber === weekNumber
    );
    if (IsWeekExist)
      throw new Error(`${weeks} already exist create another week`);

    CourseDoc.Weeks.push({ weekNumber, title });
    await CourseDoc.save();
    return res.status(200).json({
      success: true,
      data: course,
      message: "Course created succesful",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//Add lesson to the week
const addLessonInWeek = async (req, res) => {
  console.log("add lesson hit");
  try {
    const { courseId, weekNumber } = req.params;

    const { title, description, videourl } = req.body;

    const getCourseId = await course.findById(courseId); //Course is a model and now i have created a instance of it in getCourseId so now onward i have to use getCourseId for nay opperation
    if (!getCourseId) {
      return res.status(404).json({
        message: "Course not found",
        success: false,
      });
    }

    const week = getCourseId.Weeks.find(
      (w) => w.weekNumber == Number(weekNumber)
    );
    if (!week) {
      return res.status(404).json({
        message: "Week does not exist",
        success: false,
      });
    }
    week.lesson.push({ title, description, videourl });
    await getCourseId.save();
    return res.status(200).json({
      message: "Lesson create succsesfully ",
      success: false,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      message: error.message,
    });
  }
};

//Get single course data
const getSingleCourse = async (req, res) => {
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

const createCoupan = async (req, res) => {
  const courseId = req.params.courseId;
  const { coupanCode, discountedPrice, TotalUsage } = req.body;
  const creatingCoupan = await coupan.create({
    coupanCode,
    discountedPrice,
    TotalUsage,
  });
  return res.status(200).json({
    message: "Coupan Created Successful ",
  });
};

module.exports = {
  createcourse,
  createCoupan,
  getAllCourse,
  getSingleCourse,
  updatecourse,
  deleteCourse,
  createWeek,
  addLessonInWeek,
};
