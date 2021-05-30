const {
  Booking,
  Trip,
  Station,
  Company,
  StopOver,
  sequelize,
} = require('../models/index')
const { Op } = require('sequelize')
const { resToSend, res500Error } = require('../Helper/resToSend')
const trip = require('../models/trip')

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
  try {
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
      browse,
    } = req.query

    const date = new Date()
    const today = `${date.getFullYear()}-${
      date.getMonth() + 1
    }-${date.getDate()}`
    startDate = !startDate ? today : formateDate(startDate)
    endDate = !endDate ? today : formateDate(endDate)

    lowerPrice = lowerPrice ? lowerPrice : 0
    higherPrice = higherPrice ? higherPrice : 1000
    const limit = 5
    if (browse && (offset || parseInt(offset) === 0))
      offset =
        browse === 'next' ? parseInt(offset) + limit : parseInt(offset) - limit
    else offset = 0

    ///=================================

    ///=================================

    const trips = await Trip.findAndCountAll({
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
        // {
        //   model: StopOver,
        //   attributes: ['id', 'stopDate', 'station'],
        // },
        {
          model: Company,
          where: {
            id: companies ? { [Op.in]: [companies] } : { [Op.notIn]: [] },
          },
        },
        // {
        //   model: Booking,
        //   attributes: ['seatNumber'],
        // },
      ],
      order: [['startDate', 'asc']],
      limit,
      offset,
    })

    const newTrips = []
    for (let t of trips.rows) {
      const stopOvers = await t.getStopOvers()
      const bookings = await t.getBookings()

      const fullStopOvers = []
      for (let s of stopOvers) {
        //ss : station details of stopOver ,
        const ss = await Station.findOne({
          attributes: ['name', 'city'],
          where: { id: s.station },
        })
        fullStopOvers.push({
          id: s.id,
          city: ss.city,
          name: ss.name,
          stopDate: s.stopDate,
        })
      }
      const sortedStopOvers = fullStopOvers
        .slice()
        .sort((a, b) => a.stopDate - b.stopDate)

      newTrips.push({
        ...t.dataValues,
        StopOvers: sortedStopOvers,
        Bookings: bookings,
      })
    }

    res.json(
      resToSend('success', { rows: newTrips, offset, count: trips.count })
    )
  } catch (error) {
    console.error(`ERROR : ${error}`)
    res.status(500).json(error)
  }
  // .catch(() => res.json(res500Error()))
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

exports.addFullTrip = async (req, res) => {
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
  // console.info(`STOPOVERS : ${stopOvers}`)
  try {
    const result = await sequelize.transaction(async (t) => {
      const [company, created] = await Company.findOrCreate({
        where: { id: companyId, name: companyName },
        default: { name: companyName },
        transaction: t,
      })
      const [startStation, sscreated] = await Station.findOrCreate({
        where: {
          id: startStationId,
          name: startStationName,
          city: startCityName,
        },
        default: { name: startStationName },
        transaction: t,
      })
      const [endStation, escreated] = await Station.findOrCreate({
        where: { id: endStationId, name: endStationName, city: endCityName },
        default: { name: endStationName },
        transaction: t,
      })
      const newTrip = await company.createTrip(
        {
          startDate,
          endDate,
          startStation: startStation.id,
          endStation: endStation.id,
          price,
          seatCount,
          state: 'disponible',
        },
        { transaction: t }
      )
      await filterInvalideStopOver(stopOvers, newTrip)

      const stopOversOfStations = []
      for (let stp of stopOvers) {
        const [st, check] = await Station.findOrCreate({
          where: { id: stp.id, name: stp.name, city: stp.city },
          transaction: t,
        })
        stopOversOfStations.push({
          station: st.id,
          TripId: newTrip.id,
          stopDate: stp.stopDate,
        })
      }
      await StopOver.bulkCreate(stopOversOfStations, { transaction: t })

      return newTrip
    })

    res.status(201).json(resToSend('success', result))
  } catch (error) {
    if (error instanceof InvalidStopOverException)
      return res.status(400).json(resToSend('failed', error.message))

    res.status(400).json(resToSend('failed', error.errors[0].message))
  }
}

/*
    private functions
*/
class InvalidStopOverException extends Error {}
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
const filterInvalideStopOver = async (stopOvers, newTrip) => {
  const newStopOvers = stopOvers.filter((s, index) => {
    const d1 = new Date(s.stopDate)
    return (
      d1.getTime() >= newTrip.endDate.getTime() ||
      d1.getTime() <= newTrip.startDate.getTime()
    )
  })
  if (newStopOvers.length > 0)
    throw new InvalidStopOverException(
      `${newStopOvers[0].stopDate} est invalide , la date doit situé entre les date du voyage`
    )
  return newStopOvers
}

const addTripId = async (stopOvers, newTrip) => {
  const newStopOvers = stopOvers.map((s) => {
    return { ...s, trip: newTrip.id }
  })

  return newStopOvers
}
const countOfAll = (startDate, endDate, state, lowerPrice, higherPrice) => {
  console.log(startDate)
  return Trip.count({
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
  }).then((res) => res)
}
