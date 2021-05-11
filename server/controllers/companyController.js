const { Company } = require('../models/index')

exports.create = async (req, res) => {
    try {
        const company = await Company.create({ name: req.body.name })
        return res.status(201).json({ successMessage: { msg: 'compagnie crée avec succès ', company: company } })
    } catch (error) {

        if (error.name === "SequelizeValidationError")
            res.status(400).json({ error })
        else if (error.name === "SequelizeUniqueConstraintError") {
            message = "ce nom est déja utilisé"
            res.status(400).json({ errorMessage: { errors: { message: message } } })
        }
        else
            res.status(500).json({ errorMessage: { errors: { message: "une erreur s'est produite contacter l'admin" } } })
    }
}

exports.render = async (req, res) => {
    try {
        const companies = await Company.findAll()
        res.status(200).json({ successMessage: { companies: companies } })
    } catch (error) {
        res.status(500).json({ errorMessage: { errors: { message: "une erreur s'est produite contacter l'admin" } } })
    }
}

exports.update = async (req, res) => {
    try {
        const name = req.body.name
        const [companiesCount] = await Company.update({ name },
            { where: { id: req.params.id } })
        if (companiesCount === 0)
            return res.status(404).json({ errorMessage: { errors: { message: "compagnie introuvable" } } })
        const fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
        res.status(202).json({ successMessage: { msg: "compagnie modifier avec succès", URL: fullUrl } })

    } catch (error) {
        if (error.name === "SequelizeValidationError")
            res.status(400).json({ error })
        else if (error.name === "SequelizeUniqueConstraintError") {
            message = "ce nom est déja utilisé"
            res.status(400).json({ errorMessage: { errors: { message: message } } })
        }
        else
            res.status(500).json({ errorMessage: { errors: { message: "une erreur s'est produite contacter l'admin" } } })
    }
}

exports.render_one = async (req, res) => {
    try {
        const company = await Company.findOne({ where: { id: req.params.id } })
        if (company == null)
            res.status(404).json({ errorMessage: { errors: { message: "compagnie introuvable" } } })
        res.json({ successMessage: { company: company } })
    } catch (error) {
        res.status(500).json({ errorMessage: { errors: { message: "une erreur s'est produite contacter l'admin" } } })
    }
}