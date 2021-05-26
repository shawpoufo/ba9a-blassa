const express = require('express')
const router = express()
const companyController = require('../controllers/companyController')
const { validateId } = require('../Helper/requestValidation')
const { validateCompany, companyExists } = require('../Helper/validateCompany')
router.post('/company', validateCompany, companyController.create)
router.get('/company', companyController.render)
router.put(
  '/company/:id',
  validateId('company id'),
  companyExists,
  validateCompany,
  companyController.update
)
router.get(
  '/company/:id',
  validateId('company id'),
  companyExists,
  companyController.render_one
)
router.get(
  '/company/:id/trip',
  validateId('company id'),
  companyController.render_one
)
router.delete('/company', companyExists, companyController.remove)
module.exports = router
