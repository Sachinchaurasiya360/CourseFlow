const mongoose=require('mongoose')
mongoose.connect('mongodb+srv://sachinchaurasiya69:606280Sk@tesing.8vhz1.mongodb.net/Course_selling_website',)

const adminSchema=new mongoose.Schema({
    username:String,
    password:String,

})

const userSchema=new mongoose.Schema({
    username:String,
    password:String,
    purchasedCourses:[{type:mongoose.Schema.Types.ObjectId,ref:'course'}]
})

const courseSchema=new mongoose.Schema({
    title:String,
    description:String,
    price:String,

})

const Admin=mongoose.model('admin',adminSchema)
const user=mongoose.model('user',userSchema)
const course=mongoose.model('course',courseSchema)


module.exports={
    Admin,
    user,
    course}