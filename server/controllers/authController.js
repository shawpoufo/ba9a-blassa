require('dotenv').config({ path: './server/.env' })
const { User } = require('../models/index')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { resToSend, res500Error } = require('../Helper/resToSend')
const { sendValidationEmail } = require('../Helper/emailSender')
exports.sign_up = async (req, res) => {
  try {
    const { password, firstName, lastName, email } = req.body
    const hashedPassword = await bcrypt.hash(password, 10)
    const client = await User.create({
      password: hashedPassword,
      firstName: firstName,
      lastName: lastName,
      email: email,
      valide: false,
      role: 'client',
    })
    sendValidationEmail(client)
    res
      .status(201)
      .json(
        resToSend(
          'succes',
          'vous êtes inscrit avec succès ,vérifier votre boite email pour valider votre compte '
        )
      )
  } catch (error) {
    console.log(error)
    res.status(500).json(res500Error())
  }
}

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ where: { email } })
    if (user == null) {
      return res
        .status(400)
        .send()
        .json(resToSend('failed', 'utilisateur introuvable'))
    }

    if (!user.valide)
      return res
        .status(404)
        .json(resToSend('failed', 'veuillez valider votre compte'))

    if (await bcrypt.compare(password, user.password)) {
      const accessToken = generateAccessToken(user)

      //   const refreshToken = jwt.sign(
      //     user.dataValues,
      //     process.env.REFRESH_TOKEN_SECRET
      //   )
      res.json(resToSend('success', accessToken))
    } else {
      res.status(404).json(resToSend('failed', 'utilisteur introuvable'))
    }
  } catch (error) {
    res.status(500).json(res500Error())
  }
}

exports.logout = async (req, res) => {
  // refreshTokens = refreshTokens.filter(token => token !== req.body.token)
  // console.log(req.user)
  res.status(204).json({ msg: 'hi' })
}
//--------------------MidelWares-------------------

exports.authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  if (token == null) return res.sendStatus(401)

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403)
    req.user = user
    next()
  })
}
//-------------------Functions-----------------------
function generateAccessToken(user) {
  return jwt.sign(user.dataValues, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: '30d',
  })
}
