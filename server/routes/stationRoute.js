const express = require('express')
const router = express()
const stationController = require('../controllers/stationController')

router.get('/station', stationController.render)
router.get('/station/:id', stationController.render_by_id)
router.get('/station/:city', stationController.render_by_city)

router.post('/station', stationController.create)

router.delete('/station/:id', stationController.remove)

module.exports = router