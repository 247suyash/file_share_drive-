const express = require('express')
const router = express.Router()
const { Subscription } = require('../controllers')
const Auth = require('../middleware/Auth')

router.post('/subscription', Subscription.subscriptionAction)
router.get("/subscription", Auth, Subscription.subscription)


module.exports = router
