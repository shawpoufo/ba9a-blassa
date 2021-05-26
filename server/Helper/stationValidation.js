const { Station } = require('../models/index')
const { resToSend, res500Error } = require('./resToSend')

const stationExists = (req, res, next) => {
  const { id } = req.params
  Station.count({ where: { id } })
    .then((count) => {
      if (count === 0)
        return res.status(404).json(resToSend('failed', 'station introuvable'))
      next()
    })
    .catch((error) => res.status(500).json(res500Error()))
}

const validateStation = (req, res, next) => {
  const { name, city } = req.body
  const station = Station.build({ name, city })
  console.log(station)
  station
    .validate()
    .then((succes) => next())
    .catch((error) => {
      res.status(400).json(resToSend('failed', error.errors[0].message))
    })
}
module.exports = { validateStation, stationExists }
