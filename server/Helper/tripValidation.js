const validator = require('v2')
const { Trip } = require('../models/index')
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
  if (startStation && !validator.isNumeric(`${startStation}`)) {
    check.value = false
    check.message = 'startStation format incorrecte'
  }
  if (endStation && !validator.isNumeric(`${endStation}`)) {
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
  else
    return res
      .status(400)
      .json({ response: { status: 'failed', data: { payload: check } } })
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
  })
  trip
    .validate()
    .then((t) => next())
    .catch((error) =>
      res
        .status(400)
        .json({ response: { status: 'failed', data: { payload: error } } })
    )
}
module.exports = {
  validateTripParams,
  validateTrip,
}
