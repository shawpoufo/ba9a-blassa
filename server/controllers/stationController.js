const { Station } = require('../models/index')
const { Op } = require('sequelize')
const { resToSend, res500Error } = require('../Helper/resToSend')
exports.create = async (req, res) => {
  try {
    const { name, city } = req.body
    const station = await Station.create({ name: name, city, city })
    res.status(201).json(resToSend('station crée avec succès', station))
  } catch (error) {
    res.status(500).json(res500Error())
  }
}

exports.render = async (req, res) => {
  let { city } = req.query
  city = city === undefined ? '%' : city
  Station.findAll({ where: { city: { [Op.like]: city } } })
    .then((stations) => res.json(resToSend('success', stations)))
    .catch((error) => res.status(500).json(res500Error()))
}

exports.render_by_id = async (req, res) => {
  try {
    const station = await Station.findOne({ where: { id: req.params.id } })
    res.json(resToSend('succes', station))
  } catch {
    res.status(500).json(res500Error())
  }
}
exports.remove = async (req, res) => {
  try {
    let message = ''
    const id = req.params.id
    const affectedRowsCount = await Station.destroy({ where: { id } })
    res.status(202).json(resToSend('deleted'))
  } catch (error) {
    // erreur si un trip utilise cette station
    res.status(500).json(res500Error())
  }
}

exports.update = async (req, res) => {
  try {
    const id = req.params.id
    const { name, city } = req.body
    const [affectedRowsCount] = await Station.update(
      { name, city },
      { where: { id } }
    )
    const fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl
    res.status(202).json(resToSend('updated', fullUrl))
  } catch (error) {
    res.status(500).json(res500Error())
  }
}

exports.stationByCity = async (req, res) => {
  try {
    const stationsByCity = await Station.getStationsByCity()
    res.json(resToSend('succes', stationsByCity))
  } catch {
    res.status(500).json(res500Error())
  }
}
