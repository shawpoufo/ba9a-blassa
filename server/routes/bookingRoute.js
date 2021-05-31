const bookingController = require('../controllers/bookingController')
const express = require('express')
const router = express.Router()
const authenticateToken =
  require('../controllers/authController').authenticateToken

const {
  validateBooking2,
  validateBooking,
  arrVal,
} = require('../Helper/bookingValidaition')
router.post(
  '/booking',
  authenticateToken,
  arrVal,
  validateBooking,
  validateBooking2,
  bookingController.create
)
router.get('/user/booking', bookingController.render)
router.get('/admin/user/:clientId/booking', bookingController.render)
router.delete('/user/trip/:tripId/booking', bookingController.remove)

module.exports = router
