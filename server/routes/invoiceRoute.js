const express = require('express')
const router = express()
const invoiceController = require('../controllers/invoiceController')
const authenticateToken =
  require('../controllers/authController').authenticateToken
router.get('/user/invoice', authenticateToken, invoiceController.render)
module.exports = router
