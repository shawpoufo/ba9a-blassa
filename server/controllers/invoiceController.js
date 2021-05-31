const { Invoice, Trip } = require('../models/index')
const { resToSend, res500Error } = require('../Helper/resToSend')
exports.render = async (req, res) => {
  try {
    const user = req.user
    const invoices = await Invoice.findAll({ where: { clientId: user.id } })
    const newInvoices = []
    for (let i of invoices) {
      const bookings = await i.getBookings()
      const tripId = bookings[0].dataValues.tripId
      const trip = await Trip.findByPk(tripId)
      const start = await trip.getStart()
      const end = await trip.getEnd()
      newInvoices.push({ ...i.dataValues, bookings: bookings, end, start })
    }

    res.status(200).json(resToSend('success', newInvoices))
  } catch (error) {
    res.status(500).json(res500Error())
  }
}
