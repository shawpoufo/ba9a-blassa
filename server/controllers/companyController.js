const { resToSend, res500Error } = require('../Helper/resToSend')
const { Company, Trip } = require('../models/index')

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
    const companies = await Company.findAll()
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
    const fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl
    res.status(202).json(resToSend('updated', fullUrl))
  } catch (error) {
    res.status(500).json(res500Error())
  }
}

exports.render_one = async (req, res) => {
  try {
    const { id } = req.params
    const options = req.originalUrl.includes('trip') ? { include: Trip } : {}
    const company = await Company.findByPk(id, options)
    res.json(resToSend('success', company ? company : undefined))
  } catch (error) {
    res.status(500).json(res500Error())
  }
}
