const express = require('express')
const router = express()
const companyController = require('../controllers/companyController')

router.post('/company/create', companyController.create)