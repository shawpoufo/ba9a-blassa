const express = require('express')
const router = express()
const stationController = require('../controllers/stationController')

router.get('/station', stationController.render)
router.get('/station/:id', stationController.render_by_id)

router.post('/station', stationController.create)

router.delete('/station/:id', stationController.remove)
router.patch('/station/:id', stationController.update)
module.exports = router