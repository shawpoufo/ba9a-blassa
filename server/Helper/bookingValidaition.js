const { Op } = require('sequelize')
const { Booking } = require('../models/index')
const { res500Error, resToSend } = require('./resToSend')
const { body, validationResult } = require('express-validator')
const arrVal = [
  body('tripId').notEmpty().withMessage('tripId obligatoire'),
  body('seats').notEmpty().withMessage('veuiller choisire une place au moins'),
]

const validateBooking = (req, res, next) => {
  const errors = validationResult(req).array()
  if (errors.length) return res.status(400).json(resToSend('failed', errors))
  else next()
}
const validateBooking2 = async (req, res, next) => {
  try {
    const { tripId, seats } = req.body
    const response = { check: false, message: '' }
    const count = await Booking.count({
      where: {
        tripId: tripId,
        seatNumber: { [Op.in]: seats },
      },
    })
    count
      ? res
          .status(400)
          .json(resToSend('failed', "l' un des place est déja réserver !"))
      : next()
  } catch (error) {
    res.status(500).json(res500Error())
  }
}

module.exports = { validateBooking2, arrVal, validateBooking }
