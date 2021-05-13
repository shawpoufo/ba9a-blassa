const express = require('express')
const router = express()
const tripController = require('../controllers/tripController')

router.post("/trip", tripController.create)
router.get("/trip", tripController.render)
router.delete("/trip", tripController.remove)
//paginate
//patch
module.exports = router