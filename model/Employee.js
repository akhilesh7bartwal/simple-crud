
const mongoose = require('mongoose')

const employeeSchema = mongoose.Schema({
    learner_name:{
        type:String,
        required:true,
        min:4,
        max:255
    },
    learner_email:{
        type:String,
        required:true,
        min:4,
        max:255
    },
    learner_password:{
        type:String,
        required:true,
        min:4,
        max:255
    }
})

module.exports = mongoose.model('employee_detail',employeeSchema)