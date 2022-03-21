const express = require('express')
const router = express.Router()
const { auth } = require('../controllers')

// auth ApI's
router.get('/login' , auth.loginpage)
router.post('/login', auth.loginaction)
router.get('/signup' , auth.signuppage)
router.post('/signup', auth.signupaction)
router.post('/logout',auth.logoutAction)

module.exports = router
