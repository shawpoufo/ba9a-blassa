const {
  Booking,
  Trip,
  Station,
  Company,
  StopOver,
  sequelize,
} = require('../models/index')
const { Op } = require('sequelize')

exports.create = async (req, res) => {
  try {
    const {
      startDate,
      endDate,
      startStation,
      endStation,
      CompanyId,
      price,
      seatCount,
    } = req.body
    if (endStation === startStation)
      return res.status(400).json({
        response: {
          status: 'failed',
          data: {
            message:
              "la station d'arrivée doit être différente de la station de départ",
          },
        },
      })
    const trip = await Trip.create({
      startDate,
      endDate,
      startStation: startStation,
      endStation,
      CompanyId,
      price,
      seatCount,
      state: 'disponible',
    })
    res.status(201).json(resToSend('success', trip))
  } catch (error) {
    if (error.name === 'SequelizeValidationError') {
      return res.status(400).json(resToSend('failed'))
    }
    // res.status(400).json({ response: { status: 'failed', data: "une erreur s'est produite veuillez contacter l'admin" } })
    res.status(400).json(res500Error())
  }
}

exports.render = async (req, res) => {
  /*
        default date : today
        date : search by date no time
        page : 10 per page
        startCity & endCity
        Lprice & Hprice
        companies
        order by : the earlier & the latest
        equipement
        availlable seats
    */
  let {
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
  // we can't proccess without startCity & endCity  query vérification

  const date = new Date()
  const today = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`

  startDate = !startDate ? today : formateDate(startDate)
  endDate = !endDate ? today : formateDate(endDate)

  lowerPrice = lowerPrice ? lowerPrice : 0
  higherPrice = higherPrice ? higherPrice : 1000
  const limit = 10
  offset = offset ? parseInt(offset) + limit : 0
  Trip.findAndCountAll({
    where: {
      where: sequelize.where(
        sequelize.fn('date', sequelize.col('startDate')),
        '>=',
        startDate
      ),
      [Op.and]: sequelize.where(
        sequelize.fn('date', sequelize.col('startDate')),
        '<=',
        endDate
      ),
      state: state ? state : 'disponible',
      price: {
        [Op.between]: [lowerPrice, higherPrice],
      },
    },
    order: [['startDate', 'asc']], //[sequelize.fn('time', sequelize.col('startDate')), "desc"]
    include: [
      {
        model: Station,
        as: 'Start',
        where: {
          city: sequelize.col('station.startStation'),
          city: startCity,
          id: startStation ? startStation : { [Op.ne]: -1 },
        },
      },
      {
        model: Station,
        as: 'End',
        where: {
          city: sequelize.col('station.endStation'),
          city: endCity,
          id: endStation ? endStation : { [Op.ne]: -1 },
        },
      },
      {
        model: StopOver,
      },
      {
        model: Company,
        where: {
          name: companies ? { [Op.in]: companies } : { [Op.notIn]: [] },
        },
      },
      {
        model: Booking,
        attributes: ['seatNumber'],
      },
    ],
    limit,
    offset,
  })
    .then((trips) => {
      return res.json(resToSend('success', { ...trips, offset }))
    })
    .catch(() => res.json(res500Error()))
}

exports.remove = async (req, res) => {
  // etat disponible
  // et aucune réservation
  try {
    const { id } = req.params
    //vérifier l'etat: state
    const { state } = Trip.findOne({ where: { id } })
    if (sate !== 'disponible')
      return res
        .status(400)
        .json(resToSend('tu ne peut pas supprimer un voyage sans statu'))
    //vérifier si le voyage contient des réservation
    // count
    // stopover on deleted casca
    const res = Trip.destroy(id)
    res.status(204).json(resToSend('deleted'))
  } catch (error) {
    res.status(500).json(res500Error())
  }
}

/*
    private functions
*/
function generateDate(stringDate) {
  const parts = stringDate.split('-')
  const date = new Date(parts[0], parts[1] - 1, parts[2])
  return date
}
function formateDate(date) {
  const newDate = generateDate(date)
  const fomatedDate = `${newDate.getFullYear()}-${
    newDate.getMonth() + 1
  }-${newDate.getDate()}`
  return fomatedDate
}
