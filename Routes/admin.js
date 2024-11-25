const express = require("express");
const router = express.Router();
const adminMiddleware = require("../Middleware/admin");
const { course, Admin } = require("../Database/index");


router.post("/signup",(req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  Admin.create({
    username: username,
    password: password,
  });
   res.json("Admin Created");
});

router.post('/courses',adminMiddleware,async (req,res)=>{
  const title=req.body.title
  const description=req.body.description
  const price=req.body.price
  // const new_course= await 
  course.create({
    title:title,
    description:description,
    price:price
  
  }).then(()=>{
    res.json({
      message:'Course Created Successfully'})  })
  
    // course:new_course._id

})

router.get('/courses',adminMiddleware,async(req,res)=>{
  const respone=await course.find({});
   res.json({
      courses:respone
   })
})


module.exports = router;   