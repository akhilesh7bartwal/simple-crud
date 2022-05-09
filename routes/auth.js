const router = require('express').Router()

const CONTROLLER = require('../controller/Employee')

const verify = require('./authVerify')

//router.get('/')

router.post('/register', CONTROLLER.signUp)

router.post('/login', CONTROLLER.login)

router.get('/get-employees', CONTROLLER.getAllEmployees)

router.post('/add-course',CONTROLLER.addCourses)

module.exports = router