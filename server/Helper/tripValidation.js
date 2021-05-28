const validator = require('v2')
const { Trip } = require('../models/index')
const { resToSend } = require('./resToSend')
const moment = require('moment')
const validateTripParams = (req, res, next) => {
  const {
    startCity,
    endCity,
    startStation,
    endStation,
    startDate,
    endDate,
    companies,
    lowerPrice,
    higherPrice,
    offset,
    state,
  } = req.query

  const check = { value: true, message: '' }
  if (!endCity) {
    check.value = false
    check.message = "la ville de d'arrivée est obligatoire"
  }
  if (!validator.isAlpha(`${endCity}`)) {
    check.value = false
    check.message = 'endCity est une chaine de caractére'
  }
  if (!startCity) {
    check.value = false
    check.message = 'la ville de départ est obligatoire'
  }
  if (!validator.isAlpha(`${startCity}`)) {
    check.value = false
    check.message = 'startCity est une chaine de caractére'
  }
  if (startStation && !validator.isAlphanumeric(`${startStation}`)) {
    check.value = false
    check.message = 'startStation format incorrecte'
  }
  if (endStation && !validator.isAlphanumeric(`${endStation}`)) {
    check.value = false
    check.message = 'endStation format incorrecte'
  }
  if (startDate && !validator.isDate(`${startDate}` + '')) {
    check.value = false
    check.message = 'startDate format incorrecte'
  }
  if (endDate && !validator.isDate(`${endDate}`)) {
    check.value = false
    check.message = 'endDate format incorrecte'
  }
  if (lowerPrice && !validator.isDecimal(`${lowerPrice}`)) {
    check.value = false
    check.message = 'lowerPrice format incorrecte'
  }
  if (higherPrice && !validator.isDecimal(`${higherPrice}`)) {
    check.value = false
    check.message = 'higherPrice format incorrecte'
  }
  if (offset && !validator.isNumeric(`${offset}`)) {
    check.value = false
    check.message = 'offset format incorrecte'
  }
  if (state && !validator.isAlpha(`${state}`)) {
    check.value = false
    check.message = 'state format incorrecte'
  }
  if (check.value) next()
  else return res.status(400).json(resToSend('failed', check.message))
}
const validateTripParams2 = (req, res, next) => {
  const {
    startDate,
    endDate,
    startStationId,
    endStationId,
    startStationName,
    endStationName,
    companyId,
    companyName,
    price,
    seatCount,
    startCityName,
    endCityName,
    stopOvers,
  } = req.body
  console.log(
    startDate,
    endDate,
    startStationId,
    endStationId,
    startStationName,
    endStationName,
    companyId,
    companyName,
    price,
    seatCount,
    startCityName,
    endCityName,
    stopOvers
  )
  let message = ''

  if (!companyName) {
    message = 'le nom de la société est obligatoire'
  }
  if (!message && !startCityName) message = 'la ville de départ est obligatoire'

  if (!message && !validator.isAlpha(`${startCityName}`)) {
    message = 'la ville de départ est une chaine de caractére'
  }
  if (!message && !endCityName) {
    message = "la ville de d'arrivée est obligatoire"
  }
  if (!message && !validator.isAlpha(`${endCityName}`)) {
    message = "la ville d'arrivée est une chaine de caractére"
  }

  if (!message && !startStationName) {
    message = 'la station de départ est obligatoire'
  }
  if (!message && !validator.isAlphanumeric(`${startStationName}`)) {
    message = 'le format station de départ est incorrecte'
  }

  if (!message && !endStationName) {
    message = "la station d'arrivée est obligatoire"
  }
  if (!message && !validator.isAlphanumeric(`${endStationName}`)) {
    message = "le format station d'arrivée est incorrecte"
  }
  if (!message && endCityName === startCityName) {
    message = 'les villes du voyage doivent être différent'
  }
  if (!message && endStationName === startStationName) {
    message = 'les station du voyage doivent être différent'
  }
  if (!message && startDate && !moment(startDate).isValid()) {
    message = 'le format de la date de départ est incorrecte '
  }
  if (!message && startDate && !moment(endDate).isValid()) {
    message = "le format de la date d'arrivée est incorrecte "
  }
  if (!message && moment(startDate).isSameOrAfter(endDate)) {
    message = "la date de départ doit être supérieure a la date d'arrivée"
  }

  if (!message && !validator.isDecimal(price.toString()))
    message = 'format du prix est incorrecte'

  if (!message && price === 0) message = 'prix est obligatoire'
  if (!message && price < 0) message = 'prix doit être supérieure de 0'

  if (!message && !validator.isNumeric(seatCount.toString()))
    message = "le format du nombre de place est incorrecte , c'est un nombre"
  if (!message && !seatCount)
    message = 'le nombre de place doit être supérieur dee zero'

  if (!message && stopOvers.length) {
    for (let stopOver of stopOvers) {
      if (!moment(stopOver.stopDate).isBetween(startDate, endDate)) {
        message = `la date d l\'escale : (${stopOver.city} | ${
          stopOver.name
        } |${moment(stopOver.stopDate)
          .add(-1, 'h')
          .format('YYYY-MM-DD HH:mm')}) doit situé entre ${moment(startDate)
          .add(-1, 'h')
          .format('YYYY-MM-DD HH:mm')} et ${moment(endDate)
          .add(-1, 'h')
          .format('YYYY-MM-DD HH:mm')}`
        break
      }
      if (
        stopOver.name === startStationName &&
        stopOver.city === startCityName
      ) {
        message = `l\'escale ${stopOver.city} | ${stopOver.name} doit être différent du départ`
        break
      }

      if (stopOver.name === endStationName && stopOver.city === endCityName) {
        message = `l\'escale ${stopOver.city} | ${stopOver.name} doit être différent de l'arrivée`
        break
      }
    }
    const stopOversDate = stopOvers.map((s) => s.stopDate)
    const stopOversStations = stopOvers.map((s) => s.name)
    if (
      !message &&
      stopOversStations.length !== new Set(stopOversStations).size
    )
      message = 'les stations des escale doivent être différente'

    if (!message && stopOversDate.length !== new Set(stopOversDate).size)
      message = 'les date des escale doivent être différente'
  }

  if (!message) next()
  else return res.status(400).json(resToSend('failed', message))
}
const validateTrip = (req, res, next) => {
  const {
    startDate,
    endDate,
    startStation,
    endStation,
    CompanyId,
    price,
    seatCount,
  } = req.body
  const trip = Trip.build({
    startDate,
    endDate,
    startStation,
    endStation,
    CompanyId,
    price,
    seatCount,
    state: 'disponible',
  })
  trip
    .validate()
    .then((t) => next())
    .catch((error) =>
      res.status(400).json(resToSend('failed', error.errors[0].Message))
    )
}
module.exports = {
  validateTripParams,
  validateTripParams2,
  validateTrip,
}
