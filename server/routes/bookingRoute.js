const bookingController = require('../controllers/bookingController')
const express = require('express')
const router = express.Router()

router.post('/user/trip/:tripId/booking', bookingController.create)
router.get('/user/booking', bookingController.render)
router.get('/admin/user/:clientId/booking', bookingController.render)
router.delete('/user/trip/:tripId/booking', bookingController.remove)


module.exports = router