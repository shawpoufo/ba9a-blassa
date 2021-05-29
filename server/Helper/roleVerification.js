const { User } = require('../models/index')
const { res500Error, resToSend } = require('./resToSend')

const roleVerification = (role) => async (req, res, next) => {
  try {
    const user = req.user
    const result = await User.findByPk(user.id)
    result.role === role
      ? next()
      : res.status(403).json(resToSend(`failed : not ${role}`, false)) //res.status(404).json(resToSend('failed : non autorisé', false))
  } catch (error) {
    console.log(error)
    res.status(500).json(res500Error)
  }
}

const checkRole = async (req, res) => {
  try {
    const user = req.user
    const role = req.body.role
    const result = await User.findByPk(user.id)
    result.role === role
      ? res.status(200).json(resToSend('success', true))
      : res.status(403).json(resToSend(`failed`, false))
  } catch (error) {
    console.log(error)
    res.status(500).json(res500Error)
  }
}
module.exports = { roleVerification, checkRole }
