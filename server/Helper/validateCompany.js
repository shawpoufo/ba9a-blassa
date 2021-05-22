const { Company } = require('../models/index')

const companyExists = (req, res, next) => {
    const { id } = req.params
    Company.count({ where: { id } })
        .then(count => {
            if (count === 0)
                return res.status(404).json({ response: { status: 'failed', data: { message: 'compagnie introuvable' } } })
            next()
        })
        .catch(error => res.status(500).json({ response: { status: 'failed', data: { message: 'contacter l\'admin' } } }))
}

const validateCompany = (req, res, next) => {
    const { name } = req.body
    const company = Company.build({ name })
    company.validate()
        .then(succes => next())
        .catch(error => res.status(400)
            .json({ response: { status: 'failed', data: { payload: error } } }))
}
module.exports = { validateCompany, companyExists }