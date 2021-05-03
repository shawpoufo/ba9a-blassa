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
