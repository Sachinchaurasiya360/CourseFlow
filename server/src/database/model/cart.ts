import mongoose  from "mongoose";

const cart= new mongoose.Schema({
    courseId:{
        types:String,
        required:true
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
        index:true
    }
})