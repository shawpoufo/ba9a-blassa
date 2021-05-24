const express = require('express')
const router = express()
const stationController = require('../controllers/stationController')
const { validateId } = require('../Helper/requestValidation')
const {
  stationExists,
  validateStation,
} = require('../Helper/stationValidation')

router.get('/station/city', stationController.stationByCity)
router.get('/station', stationController.render)
router.get(
  '/station/:id',
  validateId('station id'),
  stationExists,
  stationController.render_by_id
)

router.post('/station', validateStation, stationController.create)

router.delete(
  '/station/:id',
  validateId('station id'),
  stationExists,
  validateStation,
  stationController.remove
)
router.patch(
  '/station/:id',
  validateId('station id'),
  stationExists,
  validateStation,
  stationController.update
)
module.exports = router
