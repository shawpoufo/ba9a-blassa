const express = require('express')
const router = express()
const stopOverController = require('../controllers/stopOverController')

router.get('/trip/:trip/stopover', stopOverController.render)
router.post("/stopover", stopOverController.create)
router.delete("/stopover/:id", stopOverController.remove)
router.patch("/trip/:trip/stopover/:id", stopOverController.update)

module.exports = router