const express = require('express')
const router = express()
const tripController = require('../controllers/tripController')
const { validateTripParams, validateTrip } = require('../Helper/tripValidation')
router.post('/trip', validateTrip, tripController.create)
router.get('/trip', validateTripParams, tripController.render)
router.delete('/trip', tripController.remove)
router.post('/fulltrip', tripController.addFullTrip)

module.exports = router
