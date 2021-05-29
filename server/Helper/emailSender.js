require('dotenv').config({ path: './server/.env' })
const nodemailer = require('nodemailer')
const jwt = require('jsonwebtoken')
const { resToSend, res500Error } = require('./resToSend')
const { User } = require('../models/index')
const sendValidationEmail = async (client) => {
  try {
    let testAccount = await nodemailer.createTestAccount()
    const transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      auth: {
        user: 'devyn.deckow58@ethereal.email',
        pass: 'GdzuubUVRM1PHVx3HB',
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
      from: 'leland.wolf90@ethereal.email',
      to: client.email,
      subject: 'ba9aBlassa email de validation',
      html: `<div>
        <h1>salam ${client.firstName} ${client.lastName}</h1>
        <h3>Veuillez clicker sur ce lien pour valider votre compte : </h3>
        <h2> !! ce message ne sera pas accessible aprés 7 jours !!</h2>
        <a href="http://localhost:4000/validateemail?key=${key}">Clic ici </a>
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
    console.log('KEY LINK', key)
    jwt.verify(key, process.env.EMAIL_TOKEN, async (err, user) => {
      if (err)
        return res
          .status(403)
          .json(resToSend('failed', 'votre lien est érroné ou éxpirés'))
      await User.update(
        { valide: true },
        { where: { id: user.id, email: user.email, password: user.password } }
      )
      return res.status(200).json(resToSend('success', true))
    })
  } catch (error) {
    res.status(500).json(res500Error())
  }
}
module.exports = { sendValidationEmail, validateEmail }
