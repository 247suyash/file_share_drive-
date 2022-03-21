const express = require('express')
const router = express.Router()
const { Permission } = require('../controllers')
const sendEmail = require('../middleware/email')
const fileShareHandle = require('../validation/fileShareHandle')

// Permission  API 
router.post('/permitted',
    fileShareHandle,
    sendEmail,
    Permission.permittedaction)


module.exports = router
