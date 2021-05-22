const { Station } = require('../models/index')

const stationExists = (req, res, next) => {
    const { id } = req.params
    Station.count({ where: { id } })
        .then(count => {
            if (count === 0)
                return res.status(404).json({ response: { status: 'failed', data: { message: 'station introuvable' } } })
            next()
        })
        .catch(error => res.status(500).json({ response: { status: 'failed', data: { message: 'contacter l\'admin' } } }))
}

const validateStation = (req, res, next) => {
    const { name, city } = req.body
    const Station = Station.build({ name, city })
    Station.validate()
        .then(succes => next())
        .catch(error => res.status(400)
            .json({ response: { status: 'failed', data: { payload: error } } }))
}
module.exports = { validateStation, stationExists }