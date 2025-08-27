const express = require("express");
const router = express.Router();
const { courseSchema } = require("../../Common/zod/index");
const { course } = require("../../Database/index");
const IsAuthenticated = require("../Middleware/isAutheticated");
const { isadmin } = require("../Middleware/isadmin");
const isAuthenticated = require("../Middleware/isAutheticated");
const cloudinary = require("../../cloudnaryConfig");
const cors = require("cors");
const app = express();
const multer = require("multer");
const { number } = require("zod");
app.use(express.json());
app.use(
  cors({
    origin: "https://localhost/5173",
    Credential: true,
  })
);
const storage = multer.memoryStorage();
const upload = multer({ storage });
const uploadToCloudnary = async (buffer, folder) => {
  try {
    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder,
          resource_type: "auto",
        },
        (error, result) => {
          if (error) {
            console.error("Cloudinary upload error:", error);
            return reject(error);
          }
          console.log("Cloudinary upload success:", result);
          return resolve(result);
        }
      );
      uploadStream.end(buffer);
    });
  } catch (error) {
    console.error("Upload to Cloudinary failed:", error);
    throw error;
  }
};
router.post(
  "/createcourse",
  upload.single("thumbnail"),
  IsAuthenticated,
  isadmin,
  async (req, res, next) => {
    try {
      console.log("from the", req.body);

      // Parse price as number before validation
      const courseData = {
        ...req.body,
        price: Number(req.body.price),
      };

      console.log("Validating course data:", courseData);

      const result = courseSchema.safeParse(courseData);
      if (!result.success) {
        return res.status(400).json({
          message: "invalid Input",
          error: result.error.flatten().fieldErrors,
        });
      }

      let thumbnailUrl = "";

      if (!req.file) {
        console.log("No file uploaded");
        return res.status(400).json({
          message: "Please upload a thumbnail image",
        });
      }

      try {
        console.log("Uploading file to Cloudinary...");
        const uploadresult = await uploadToCloudnary(
          req.file.buffer,
          "thumbnail"
        );
        console.log("Cloudinary response:", uploadresult);

        

        thumbnailUrl = uploadresult.secure_url;
      } catch (error) {
        console.error("Error uploading to Cloudinary:", error);
        return res.status(500).json({
          message: "Failed to upload thumbnail",
        });
      }

      console.log(
        "Creating course with data:",
        result.data,
        "and thumbnail:",
        thumbnailUrl
      );
      const { title, description, price, category } = result.data;
      const createcourse = await course.create({
        title,
        description,
        price,
        category,
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
  }
);
//we can implement the pagination and soft/hard delete
router.put("/updatecourse:id", isAuthenticated, isadmin, async (req, res) => {
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
});
router.delete(
  "/deletecourse:id",
  isAuthenticated,
  isadmin,
  async (req, res) => {
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
  }
);
router.get("/allcourses", isAuthenticated, isadmin, async (req, res) => {
  try {
    const allcourses = await course.find();
    return res.status(200).json({
      courses: allcourses,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "internal server error",
    });
  }
});

module.exports = router;
