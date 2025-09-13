const express = require("express");
const router = express.Router();
const {course} = require("../../Database/index");


router.get("/course", async (req, res) => {
  try {
    const result = await course.find().limit(4);
    if (!result) {
      return res.status(400).json({
        message: "There is no course in database",
      });
    }
    return res.status(200).json({
      courses: result,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
});

//Implementing pagination in the mongodb
router.get("/search", async (req, res) => {
  try {
    const search = req.query.query?.trim();
    console.log(search);
    const page = parseInt(req.query.page) || 1; // if user doesn't send then it will be set as 1
    const limit = parseInt(req.query.limit) || 10; //if user doesn't send then it will be set as 10
    if (!search) {
      return res.status(200).json({
        message: "Invalid query find",
      });
    }
    const queryregex = new RegExp(query, "i"); //i flag indicate that hello HELLO are the same
    const filter = {
      $or: [{ title: queryregex }, { category: queryregex }],
    };

    const searchIndb =
      (await course.find(filter).skip(page - 1)) * limit.limit(limit);
    const totaldoc = await course.countDoucment(filter);
    res.status(200).json({
      data: searchIndb,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(400).json({
      message: "Internal server errror",
    });
  }
});




module.exports = router;