const express = require('express')
const router = express.Router()
const {  Upload } = require('../controllers')


const multer = require("multer") //multer is required for file upload
const fs =require('fs-extra')
const path =require('path')
const fileUploadHandle = require('../validation/fileUploadHandle')

// route for file upload
const uploadPath = path.join(__dirname, "..", "uploads");
fs.ensureDirSync(uploadPath); // sure that path is exiting or not 
const storage = multer.diskStorage({
    destination: uploadPath,
    filename: function (req, file, cb) {
      try{
        cb(null, file.fieldname + '_' + Date.now() + path.extname(file.originalname))
      }catch(err){
        console.log("error")
      }
    }
  })
const upload =multer({storage:storage})
router.post('/upload',fileUploadHandle,upload.single("file"), Upload.uploadaction)




module.exports = router