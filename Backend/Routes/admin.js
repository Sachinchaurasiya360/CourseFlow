const express = require("express");
const router = express.Router();
const { courseSchema } = require("../../Common/zod/index");
const { course } = require("../../Database/index");
const IsAuthenticated = require("../Middleware/IsAutheticated");
const { isadmin } = require("../Middleware/isadmin");
const isAuthenticated = require("../Middleware/IsAutheticated");

//Add middleware
router.post(
  "/createcourse",
  IsAuthenticated,
  isadmin,
  async (req, res, next) => {
    try {
      const result = courseSchema.safeParse(req.body);
      if (!result.success) {
        return res.status(400).json({
          message: "invalid Input",
          error: result.error.flatten().fieldErrors,
        });
        
      }
      const { title, description, price, category } = result.data;
      const createcourse = await course.create({
        title,
        description,
        price,
        category,
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
router.delete('/deletecourse:id',isAuthenticated,isadmin,async (req,res)=>{
  try{
    const courseId=req.params.id
    const findCourse= await course.findByIdAndDelete(courseId)
    if(!findCourse){
      return res.status(400).json({
        message:"course doesn't exist"
      })
    }
    return res.status(200).json({
      message:"Couse deleted successfully"
    })

  }catch(error){
    console.error(Error)
    res.status(500).json({
      message:"Internal server error"
    })
  }
})
router.get('/allcourses',isAuthenticated,isadmin,async(req,res)=>{
  try{
    const allcourses=await course.find()
    return res.status(200).json({
      courses:allcourses
    })

  }catch(error){
    console.error(error)
    return res.status(500).json({
    message:"internal server error"

    })
  }
})

module.exports = router;
