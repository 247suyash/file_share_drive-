const express = require('express')
const router = express.Router()
const { auth } = require('../controllers')
const { SignupValidations } = require('../validation/signupHandle')
const {forgetPasswordValidations} =require('../validation/forgetHandle')
const {handleValidationErrors ,signinhandleValidationErrors} = require('../middleware/validate')
const { loginValidations } = require('../validation/loginHandle')
const {forgetValidationErrors} =require('../middleware/emailMiddleware')
// auth ApI's
router.get('/login' , auth.loginpage)
router.post('/login',loginValidations,signinhandleValidationErrors, auth.loginaction)
router.get('/signup' , auth.signuppage)
router.post('/signup',SignupValidations, handleValidationErrors, auth.signupaction)
router.post('/logout',auth.logoutAction)

router.get('/forget' , auth.forgetpage)
router.post('/forget',forgetPasswordValidations,forgetValidationErrors,auth.forgetAction)
router.get('/resetpassword/:id/:token' , auth.resetPasspage)
router.post('/resetpassword/:id/:token' , auth.resetAction)





module.exports = router
