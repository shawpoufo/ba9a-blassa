const { Company, Trip } = require('../models/index')

exports.create = async (req, res) => {
    try {
        const company = await Company.create({ name: req.body.name })
        return res.status(201).json({ successMessage: { msg: 'compagnie crée avec succès ', company: company } })
    } catch (error) {
        res.status(500).json({ response: { status: 'failed', data: { message: "une erreur s'est produite contacter l'admin" } } })
    }
}

exports.render = async (req, res) => {
    try {
        const companies = await Company.findAll()
        res.status(200).json({ successMessage: { companies: companies } })
    } catch (error) {
        res.status(500).json({ response: { status: 'failed', data: { message: "une erreur s'est produite contacter l'admin" } } })
    }
}

exports.update = async (req, res) => {
    try {
        const name = req.body.name
        const [companiesCount] = await Company.update({ name },
            { where: { id: req.params.id } })
        const fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
        res.status(202).json({ response: { status: "success", data: { payload: fullUrl } } })

    } catch (error) {
        res.status(500).json({ response: { status: 'failed', data: { message: "une erreur s'est produite contacter l'admin" } } })
    }
}

exports.render_one = async (req, res) => {
    try {
        const { id } = req.params
        const options = req.originalUrl.includes('trip') ? { include: Trip } : {}
        const company = await Company.findByPk(id, options)
        res.json({ response: { status: 'success', data: { payload: company ? company : undefined } } })
    } catch (error) {
        res.status(500).json({ response: { status: 'failed', data: { message: "une erreur s'est produite contacter l'admin" } } })

    }
}