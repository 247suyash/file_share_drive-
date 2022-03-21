const express = require('express')
const router = express.Router()
const { home } = require('../controllers')
const Auth = require('../middleware/Auth')

//home page Api's
router.get('/' ,Auth,home.homepage)
router.post('/', home.homeaction)



module.exports = router
