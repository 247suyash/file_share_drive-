const express = require('express')
const router = express.Router()
const { auth } = require('../controllers')
const { SignupValidations } = require('../validation/signupHandle')
const {handleValidationErrors ,signinhandleValidationErrors} = require('../middleware/validate')
const { loginValidations } = require('../validation/loginHandle')
// auth ApI's
router.get('/login' , auth.loginpage)
router.post('/login',loginValidations,signinhandleValidationErrors, auth.loginaction)
router.get('/signup' , auth.signuppage)
router.post('/signup',SignupValidations, handleValidationErrors, auth.signupaction)
router.post('/logout',auth.logoutAction)

module.exports = router
