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
          true,
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
    const user = await User.findOne({
      where: { email },
    })
    const logRes = { status: 400, message: 'email ou password incorrecte' }
    if (!user) {
      logRes.status = 400
      logRes.message = 'email ou password incorrecte'
    }

    if (password && user && (await bcrypt.compare(password, user.password))) {
      if (user && user.valide === false) {
        logRes.status = 400
        logRes.message = 'veuillez confirmer votre compte'
      }

      if (user && user.valide) {
        const accessToken = generateAccessToken(user)
        logRes.status = 200
        logRes.message = accessToken
      }
    }

    res
      .status(logRes.status)
      .json(
        resToSend(logRes.status === 200 ? 'success' : 'failed', logRes.message)
      )
  } catch (error) {
    console.log(error)
    return res.status(500).json(error)
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
    if (err)
      return res.status(403).json(resToSend('failed:not authenticated', false))
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
