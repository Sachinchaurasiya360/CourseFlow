const express = require("express");
const { createBlog } = require("../controller/blog.controller");
const { isAuthenticated } = require("../Middleware/isAutheticated");
const router = express.Router();

router.post("/createblog", isAuthenticated, createBlog);

module.exports = router;
