const { resToSend, res500Error } = require('../Helper/resToSend')
const { Station, Company, Trip, sequelize } = require('../models/index')

exports.create = async (req, res) => {
  try {
    const company = await Company.create({ name: req.body.name })
    return res
      .status(201)
      .json(resToSend('compagnie crée avec succès ', company))
  } catch (error) {
    res.status(500).json(res500Error())
  }
}

exports.render = async (req, res) => {
  try {
    const companies = await Company.findAll({
      attributes: ['id', 'name'],
      group: ['id', 'name'],
    })
    res.status(200).json(resToSend('success', companies))
  } catch (error) {
    res.status(500).json(res500Error())
  }
}

exports.update = async (req, res) => {
  try {
    const name = req.body.name
    const [companiesCount] = await Company.update(
      { name },
      { where: { id: req.params.id } }
    )
    // const fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl
    const updatedCompany = await Company.findByPk(req.params.id)
    res.status(202).json(resToSend('updated', updatedCompany))
  } catch (error) {
    res.status(500).json(res500Error())
  }
}

exports.render_one = async (req, res) => {
  try {
    const { id } = req.params
    const company = await Company.findByPk(id, { include: Trip })
    const newTrips = []
    for (let t of company.Trips) {
      const bookingsCount = await t.countBookings()
      const StopOvers = await t.getStopOvers()

      const fullStopOvers = []
      for (let s of StopOvers) {
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

      const Start = await t.getStart()
      const End = await t.getEnd()
      newTrips.push({
        ...t.dataValues,
        bookingsCount,
        StopOvers: fullStopOvers,
        End,
        Start,
        Company: company,
      })
    }
    const newCompany = { ...company.dataValues, Trips: newTrips }
    res.json(resToSend('success', newCompany ? newCompany : null))
  } catch (error) {
    console.log(error)
    res.status(500).json(res500Error())
  }
}

exports.remove = async (req, res) => {
  try {
    const result = await sequelize.transaction(async (t) => {
      const id = req.body.id
      const company = await Company.findByPk(id, { transaction: t })
      const count = await company.countTrips({ transaction: t })
      if (count) return false
      else {
        await Company.destroy({ where: { id: id } }, { transaction: t })
        return true
      }
    })
    result
      ? res
          .status(200)
          .json(resToSend('deleted', 'company supprimé avec succès'))
      : res
          .status(400)
          .json(
            resToSend(
              'failed',
              'cette company posséde des voyage tu ne peux pas la supprimé !'
            )
          )
  } catch (error) {
    res.status(500).json(error)
  }
}
