const Employee = require('../model/Employee');

const EmployeeCourse = require('../model/EmployeeCourses');

const bcrypt = require('bcryptjs');

const Joi = require('@hapi/joi');

const jwt = require('jsonwebtoken')

exports.signUp = async (req,res)=>{
    const emailExist = await Employee.findOne({learner_email: req.body.learner_email})

    if(emailExist){
        res.status(400).send("Email exist");
        return;
    }


const salt = await bcrypt.genSalt(10)

const hashedPassword = await bcrypt.hash(req.body.learner_password,salt)

const employee = new Employee({
    learner_name:req.body.learner_name,
    learner_email: req.body.learner_email,
    learner_password: hashedPassword
})

try{

    const resgistrationSchema = Joi.object({
        learner_name: Joi.string().min(6).required(),
        learner_email: Joi.string().min(6).required().email(),
        learner_password: Joi.string().min(6).required()
    })
const {error}= await resgistrationSchema.validateAsync(req.body)

if(error){
    res.status(200).send(error.details[0].message)
    return;
}
else{
    const saveEmployee = await employee.save()
    res.status(200).send("employee created successfully.")
}
}
catch(error){
    res.status(500).send(error)
}

}

exports.login = async (req,res) =>{
    const employee = await Employee.findOne({learner_email: req.body.learner_email})
    if(!employee){
        return res.status(400).send("Incorrect email")
    }

    const validatePassword = await bcrypt.compare(req.body.learner_password,employee.learner_password)
    if(!validatePassword){
        return res.status(400).send("Incorrect password")
    }

    try{
        const loginSchema = Joi.object({
            learner_email:Joi.string().min(4).required().email(),
            learner_password:Joi.string().min(4).required()
        })

        const {error} = await loginSchema.validateAsync(req.body)
        if(error)
            return res.status(400).send(error.details[0].message)
        else{
            const token = jwt.sign({_id:employee._id},process.env.TOKEN_SECRET)
            res.send(token)
        }
    }
    catch(error){res.send(error)}
}

exports.getAllEmployees =async (req, res) =>{
    const employees =await Employee.find()

    try{
        res.status(200).send(employees)
    }
    catch(error){
        res.status(500).send(error)
    }
}

exports.addCourses = async (req,res) =>{
    //const employee = 
    const employee = await Employee.findOne({learner_email: req.body.learner_email})
    if(!employee){
        return res.status(400).send("Incorrect email")
    }

    const validatePassword = await bcrypt.compare(req.body.learner_password,employee.learner_password)
    if(!validatePassword){
        return res.status(400).send("Incorrect password")
    } 

 //   EmployeeCourse
    const employeeCourse = new EmployeeCourse({
        course_Id:req.body.course_Id,
        course_name: req.body.course_name,
        course_description: req.body.course_description
    })

    try{

        const courseSchema = Joi.object({
            course_Id: Joi.number().min(6).required(),
            course_name: Joi.string().min(6).required(),
            course_description: Joi.string().min(6).required()
        })
    const {error}= await courseSchema.validateAsync(req.body)
    
    if(error){
        res.status(200).send(error.details[0].message)
        return;
    }
    else{
        const saveEmployee = await employeeCourse.save()
        res.status(200).send("employee course added successfully.")
    }
    }
    catch(error){
        res.status(500).send(error)
    }
}

exports.getCourses = async (req, res) =>{

}