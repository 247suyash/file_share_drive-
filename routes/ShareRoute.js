const express = require('express')
const router = express.Router()
const { share} = require('../controllers')

router.post('/public', share.sharePublically)


module.exports = router
