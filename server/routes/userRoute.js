const express = require('express')
const router = express.Router()
const authenticateToken =
  require('../controllers/authController').authenticateToken
const userController = require('../controllers/userController')

router.get('/user/info', authenticateToken, userController.info)

module.exports = router
