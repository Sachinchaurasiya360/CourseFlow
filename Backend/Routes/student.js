const express = require("express");
const app = express();
const router = express.Router();
const { user } = require("../../Database/index");
const { signupSchema, loginschema } = require("../../Common/zod/index");
const bcrypt = require("bcrypt");
const isAuthenticated = require("../Middleware/isAutheticated");
const cors = require("cors");
app.use(express.json());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));



//Insted of writing all the code here we can use MVC architechture for better modularity



// router.post("/forgetPassword", async (req, res) => {
//   try {
//     const result = loginschema.safeParse(req.body);
//     if (!result) {
//       return res.status(400).json({
//         message: "invalid password format",
//       });
//     }
//     const searchindb= await user.findOne({email})
//     console.log(searchindb)
//     if(!searchindb){
//       return res.status(400).json({
//         message:"User doesn't exist in database"
//       })
//     }
//     const updatepassword=await user.updateOne(searchindb.password,)
//   }
//   catch (error) {
//     console.error(error);
//     return res.status(500).json({
//       message: "Internal server error",
//     });
//   }
// });

router.get("/me", isAuthenticated, async (req, res) => {
  try {
    const currentuser = await user.findById(req.user.id).select("-password");
    return res.status(200).json({
      message: currentuser,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: error.response?.data?.message,
    });
  }
});
module.exports = router;
