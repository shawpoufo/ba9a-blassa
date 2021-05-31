const { User, Booking, Trip, sequelize } = require('../models/index')
const { resToSend, res500Error } = require('../Helper/resToSend')

exports.create = async (req, res) => {
  try {
    const { tripId, seats } = req.body
    const user = req.user
    const clientId = user.id
    const bookings = []
    let trip = null
    let invoice = null

    const result = await sequelize.transaction(async (t) => {
      // get the price of the trip
      trip = await Trip.findByPk(tripId, { transaction: t })
      const total = trip.price * seats.length
      // insert the invoice first
      const client = await User.findByPk(clientId)
      invoice = await client.createInvoice(
        { date: new Date(), total },
        { transaction: t }
      )
      // //insert the bookings
      for (const seat of seats) {
        const booking = await client.createBooking(
          { tripId, invoiceId: invoice.id, seatNumber: seat },
          { transaction: t }
        )
        bookings.push(booking)
      }
    })
    // //change trip state to complet ["disponible", "complet", "annulée", "fini"]
    // // get count of booking of the trip
    const countBooking = await Trip.count({
      include: [
        {
          model: Booking,
          where: {
            tripId,
          },
        },
      ],
    })
    console.log(`COUNT : ${countBooking}`)
    console.log('SEAT : ' + trip.seatCount)
    if (countBooking === trip.seatCount) {
      trip.state = 'plein'
      console.log('saved')
      await trip.save()
    }
    // payload: { bookings, countBooking, trip, invoice } }
    res.status(201).json(resToSend('success', true))
  } catch (error) {
    console.log(error)
    res.status(500).json(res500Error())
  }
}
exports.render = (req, res) => {
  const { clientId } = req.originalUrl.includes('admin') ? req.params : req.body
  Booking.findAll({
    where: {
      clientId: clientId,
    },
  })
    .then((bookings) => {
      res.status(200).json({
        response: {
          status: 'success',
          data: { message: '', paylaod: bookings },
        },
      })
    })
    .catch((error) => {
      res.status(500).json({
        response: {
          status: 'failed',
          data: { message: "contacter  l'admin" },
        },
      })
    })
}

exports.remove = async (req, res) => {
  try {
    // stocker les réservation annulée
    const { tripId } = req.params
    const { clientId, seatNumber } = req.body
    let affectedRowsCount = null
    const trip = await Trip.findByPk(tripId, { attributes: ['state'] })
    if (trip.state !== 'fini') {
      affectedRowsCount = await Booking.destroy({
        where: {
          tripId,
          clientId,
          seatNumber,
        },
      })
    }

    res.json({
      response: {
        status: 'success',
        data: { message: '', payload: affectedRowsCount },
      },
    })
  } catch (error) {
    res.status(500).json({
      response: { status: 'failed', data: { message: "contacter l'admin" } },
    })
  }
}
