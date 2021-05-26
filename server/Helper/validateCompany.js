const { Company } = require('../models/index')
const { resToSend, res500Error } = require('./resToSend')

const companyExists = (req, res, next) => {
  let { id } = req.params
  if (!id) id = req.body.id
  Company.count({ where: { id } })
    .then((count) => {
      if (count === 0)
        return res.status(404).json(resToSend('failed', 'company introuvable'))
      next()
    })
    .catch((error) => res.status(500).json(res500Error()))
}

const validateCompany = (req, res, next) => {
  const { name } = req.body
  const company = Company.build({ name })
  company
    .validate()
    .then((succes) => next())
    .catch((error) => {
      res.status(400).json(resToSend('failed', error.errors[0].message))
    })
}
module.exports = { validateCompany, companyExists }
