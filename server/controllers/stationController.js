const { Station } = require('../models/index')
const { Op } = require("sequelize");


exports.create = async (req, res) => {
    try {
        const { name, city } = req.body
        const station = await Station.create({ name: name, city, city })
        res.status(201).json({ successMessage: { msg: "station crée avec succès", station: station } })

    } catch (error) {
        res.status(500).json({ errorMessage: { errors: { message: "une erreur s'est produite contacter l'admin" } } })
    }
}

exports.render = async (req, res) => {
    let { city } = req.query
    city = city === undefined ? "%" : city
    Station.findAll({ where: { city: { [Op.like]: city } } }).then(stations => res.json({ successMessage: { msg: '', stations: stations } }))
        .catch(error => res.status(500).json({ response: { status: "failed", data: { message: error } } }))

}

exports.render_by_id = async (req, res) => {
    try {
        const station = await Station.findOne({ where: { id: req.params.id } })
        res.json({ successMessage: { msg: '', station: station } })
    } catch (error) {
        res.status(500).json(error)
    }
}
exports.remove = async (req, res) => {
    try {
        let message = ""
        const id = req.params.id
        const affectedRowsCount = await Station.destroy({ where: { id } })
        res.status(202).json({ response: { message: message } })

    } catch (error) {
        // erreur si un trip utilise cette station
        res.status(500).json({ response: { message: error } })
    }
}

exports.update = async (req, res) => {
    try {
        const id = req.params.id
        const { name, city } = req.body
        const [affectedRowsCount] = await Station.update({ name, city }, { where: { id } })
        const fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
        res.status(202).json({ successMessage: { msg: "station modifier avec succès", URL: fullUrl } })
    } catch (error) {
        res.status(500).json({ errorMessage: { errors: { message: "une erreur s'est produite contacter l'admin" } } })
    }
}