const express = require("express");
const router = express.Router();
const userMiddleware = require("../Middleware/user");
const { course, user } = require("../Database/index");
// Define routes
router.get("/profile", (req, res) => {
  res.json({ message: "User profile" });
});

router.post('/signup', (req, res) => {
  const { username, password } = req.body;

  user.findOne({ username: username })
    .then((data) => {
      if (data) {
        return res.json({
          message: 'User already exists with this username'
        });
      } else {
        return user.create({ username, password })
          .then((newUser) => {
            res.json({
              message: 'User Created',
              user: newUser
            });
          });
      }
    })
    .catch((error) => {
      console.error("Error during user signup:", error);
      res.status(500).json({ message: 'An error occurred', error: error.message });
    });
});





router.post('/courses/:courseId',userMiddleware,(req,res)=>{
  const courseId=req.params.courseId;
  const username=req.header.username;
  user.updateOne
  ({
    username:username},{
    $push:{purchasedCourses:courseId}
  }).then(()=>{
    res.json({message:'Course Purchased'})
  })
})
module.exports = router;  
