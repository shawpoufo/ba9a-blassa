const express = require('express')
const router = express()
const companyController = require('../controllers/companyController')
router.post('/company', companyController.create)
router.get('/company', companyController.render)
router.put('/company/:id', companyController.update)
router.get('/company/:id', companyController.render_one)
module.exports = router