const { Station } = require('../models/index')
const { Op } = require("sequelize");


exports.create = async (req, res) => {
    try {
        const { name, city } = req.body
        const station = await Station.create({ name: name, city, city })
        res.status(201).json({ successMessage: { msg: "station crée avec succès", station: station } })

    } catch (error) {
        if (error.name === "SequelizeValidationError")
            res.status(400).json({ error })
        else if (error.name === "SequelizeUniqueConstraintError")
            res.status(400).json({ error })
        else
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
        const id = parse.int(req.params.id)
        console.log(id)
        if (isNan(id)) res.status(400).json({ errorMessage: { errors: { msg: 'mauvaise requete' } } })
        const station = await Station.findOne({ where: { id: req.params.id } })
        res.json({ successMessage: { msg: '', station: station } })
    } catch (error) {
        if (error.name === "SequelizeValidationError")
            res.status(400).json({ error })
        else
            // res.status(500).json({ errorMessage: { errors: { message: "une erreur s'est produite contacter l'admin" } } })
            res.status(500).json(error)
    }
}
exports.remove = async (req, res) => {
    try {
        let message = ""
        const id = req.params.id
        const affectedRowsCount = await Station.destroy({ where: { id } })
        message = affectedRowsCount === 0 ? "cette station n'existe pas!" : 'station supprimer avec succès'
        res.status(202).json({ response: { message: message } })

    } catch (error) {
        // erreur si un trip utilise cette station
        res.status(500).json({ response: { message: error } })
    }
}

exports.update = async (req, res) => {

    try {
        const id = req.params.id
        if (id == null) res.status(400).json({ errorMessage: { errors: { message: "veuiller indique l\'id de la station a supprimer" } } })
        const { name, city } = req.body
        const [affectedRowsCount] = await Station.update({ name, city }, { where: { id } })
        if (affectedRowsCount === 0)
            return res.status(404).json({ errorMessage: { msg: "station introuvable" } })
        const fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
        res.status(202).json({ successMessage: { msg: "station modifier avec succès", URL: fullUrl } })
    } catch (error) {
        if (error.name === "SequelizeValidationError")
            res.status(400).json({ error })
        else if (error.name === "SequelizeUniqueConstraintError")
            res.status(400).json({ response: { message: `le nom ${req.body.name} existe déja veuillez le changer` } })
        else
            res.status(500).json({ errorMessage: { errors: { message: "une erreur s'est produite contacter l'admin" } } })
    }
}