const express = require('express')
const router = express.Router()
const { UserController } = require('../controllers')
const multer = require("multer") //multer is required for file upload
const fs =require('fs-extra')
const path =require('path')
const sendEmail = require('../middleware/email')

// home page API 
router.get('/' , UserController.homepage)
router.post('/', UserController.homeaction)

// login page API 
router.get('/login' , UserController.loginpage)
router.post('/login', UserController.loginaction)

// signup page API 
router.get('/signup' , UserController.signuppage)
router.post('/signup', UserController.signupaction)

// route for file upload
const uploadPath = path.join(__dirname, "..", "uploads");
fs.ensureDirSync(uploadPath); // sure that path is exiting or not 
const upload =multer({dest: uploadPath})
router.post('/upload',upload.single("file"), UserController.uploadaction)

// route for Email
// router.post('/email',UserController.sendEmail)S

// signup page API 
router.post('/permitted',sendEmail,UserController.permittedaction)


module.exports = router