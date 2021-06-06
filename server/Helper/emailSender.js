require('dotenv').config({ path: './server/.env' })
const nodemailer = require('nodemailer')
const jwt = require('jsonwebtoken')
const { resToSend, res500Error } = require('./resToSend')
const { User } = require('../models/index')
const sendValidationEmail = async (client) => {
  try {
    let testAccount = await nodemailer.createTestAccount()
    const transporter = nodemailer.createTransport({
      host: 'smtp.office365.com',
      port: 587,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    })
    // generer le lien de validation
    console.log(client.dataValues)
    console.log(process.env.EMAIL_TOKEN)

    const key = jwt.sign(client.dataValues, process.env.EMAIL_TOKEN, {
      expiresIn: '7d',
    })
    console.log(key)

    //-----------------------
    let message = await transporter.sendMail({
      from: process.env.EMAIL,
      to: client.email,
      subject: 'ba9aBlassa email de validation',
      html: `<div>
        <h1>salam ${client.firstName} ${client.lastName}</h1>
        <h3>Veuillez clicker sur ce lien pour valider votre compte : </h3>
        <h2> !! ce message ne sera pas accessible aprés 7 jours !!</h2>
        <a target=_blank href=http://localhost:4000/validateemail?key=${key}  >Click ici </a>
      </div>`,
    })

    console.log('message id :', message.messageId)

    console.log('URL :', nodemailer.getTestMessageUrl(message))
  } catch (error) {
    console.error(error)
  }
}
const validateEmail = async (req, res) => {
  try {
    const key = req.query.key
    const resObj = {
      status: 404,
      payload: 'lien invalide',
      statusMessage: 'failed',
    }
    jwt.verify(key, process.env.EMAIL_TOKEN, async (err, user) => {
      if (err) {
        resObj.status = 403
        resObj.payload = 'votre lien est érroné ou éxpirés'
      } else {
        await User.update(
          { valide: true },
          { where: { id: user.id, email: user.email, password: user.password } }
        )
        resObj.status = 200
        resObj.payload = true
      }

      return res
        .status(resObj.status)
        .json(resToSend(resObj.statusMessage, resObj.payload))
    })
  } catch (error) {
    res.status(500).json(res500Error())
  }
}
module.exports = { sendValidationEmail, validateEmail }
