const { resToSend, res500Error } = require('../Helper/resToSend')
const { User } = require('../models/index')

exports.info = async (req, res) => {
  try {
    const user = req.user
    const info = await User.findOne({
      attributes: ['firstName', 'lastName'],
      where: { id: user.id },
    })
    res.status(200).json(resToSend('success', info))
  } catch (error) {
    res.status(500).json(res500Error())
  }
}
