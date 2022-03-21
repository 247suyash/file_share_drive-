const express = require('express')
const router = express.Router()
const { share} = require('../controllers')
const fileSharePublicHandle = require('../validation/fileSharePublicHandle')

router.post('/public',fileSharePublicHandle, share.sharePublically)


module.exports = router
