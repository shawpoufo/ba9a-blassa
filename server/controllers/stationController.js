const Station = require('../models/station')


exports.create = async (req, res) => {
    try {
        const { name, city } = req.body
        const station = await Station.create({ name: name, city, city })
        res.status(201).json({ successMessage: { msg: "station crée avec succès", station: station } })

    } catch (error) {
        if (error.name === "SequelizeValidationError")
            res.status(400).json({ error })
        else
            res.status(500).json({ errorMessage: { errors: { message: "une erreur s'est produite contacter l'admin" } } })
    }
}

exports.render = async (req, res) => {
    console.log(Station)
    Station.findAll().then(stations => res.json({ successMessage: { msg: '', stations: stations } }))
        .catch(error => res.status(500).json({ error: "une erreur s'est produite contacter l'admin" }))
}

exports.render_by_id = async (req, res) => {
    try {
        const id = parse.int(req.params.id)
        if (isNan(id)) res.status(400).json({ errorMessage: { errors: { msg: 'mauvaise requete' } } })
        const station = await Station.findOne({ where: { id: req.params.id } })
        res.json({ successMessage: { msg: '', station: station } })
    } catch (error) {
        if (error.name === "SequelizeValidationError")
            res.status(400).json({ error })
        else
            res.status(500).json({ errorMessage: { errors: { message: "une erreur s'est produite contacter l'admin" } } })
    }
}
exports.render_by_city = async (req, res) => {
    try {
        const station = await Station.findOne({ where: { city: req.params.city } })
        res.json({ successMessage: { msg: '', station: station } })
    } catch (error) {
        if (error.name === "SequelizeValidationError")
            res.status(400).json({ error })
        else
            res.status(500).json({ errorMessage: { errors: { message: "une erreur s'est produite contacter l'admin" } } })
    }
}

exports.remove = async (req, res) => {
    try {
        const id = req.params.id
        if (id == null) res.status(400).json({ errorMessage: { errors: { message: "veuiller indique l\'id de la station a supprimer" } } })
        const r = Station.destroy(id)
        res.status(204).json({ successMessage: { msg: 'station supprimer avec succès' } })

    } catch (error) {
        // erreur si un trip utilise cette station
    }
}