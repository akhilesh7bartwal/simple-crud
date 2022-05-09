const mongoose = require('mongoose')

const employeeCoursesSchema = mongoose.Schema({
    course_Id:{
        type:Number,
        required:true,
        min:4,
        max:12
    },
    course_name:{
        type:String,
        required:true,
        min:4,
        max:255
    },
    course_description:{
        type:String,
        required:true,
        min:4,
        max:255
    }
})

module.exports = mongoose.model('employee_courses_detail',employeeCoursesSchema)