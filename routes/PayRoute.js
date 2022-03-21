const express = require('express')
const router = express.Router()
const { payPalConfig } = require('../controllers')

// Permission  API 
router.post('/pay',payPalConfig.payPal)
router.get('/success',payPalConfig.paySuccess)
router.get('/cancel',payPalConfig.payCancel)
module.exports = router
