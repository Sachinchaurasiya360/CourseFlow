const express = require("express");
const router = express.Router();


router.post("/createcourse", async (req, res) => {
    console.log("hello");
    
    return res.json({
        message:"hello"
    })
});

module.exports = router;
