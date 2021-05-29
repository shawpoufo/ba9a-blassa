const express = require('express')
const router = express()
const tripController = require('../controllers/tripController')
const {
  validateTripParams,
  validateTripParams2,
  validateTrip,
} = require('../Helper/tripValidation')
const authenticateToken =
  require('../controllers/authController').authenticateToken
const { roleVerification } = require('../Helper/roleVerification')
// router.post('/admin/trip',authenticateToken, validateTrip, tripController.create)
// router.delete('/trip', tripController.remove)
router.get('/trip', validateTripParams, tripController.render)

router.post(
  '/admin/fulltrip',
  authenticateToken,
  roleVerification('admin'),
  validateTripParams2,
  tripController.addFullTrip
)

module.exports = router
