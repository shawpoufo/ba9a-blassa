const { body, validationResult } = require('express-validator')
const { resToSend } = require('./resToSend')
const { User } = require('../models/index')
const signUpValidations = [
  body('firstName')
    .notEmpty()
    .withMessage('prénom obligatoire')
    .isAlpha()
    .withMessage('prénom est une chaine de caracter'),
  body('lastName')
    .notEmpty()
    .withMessage('nom obligatoire')
    .isAlpha()
    .withMessage('nom est une chaine de caracter'),
  body('email')
    .notEmpty()
    .withMessage('email obligatoire')
    .isEmail()
    .withMessage('format incorrecte'),
  body('password').notEmpty().withMessage('mot de passe obligatoire'),
]
const validateSignUp = (req, res, next) => {
  const errors = validationResult(req).array()
  console.log(errors)
  if (errors.length) return res.status(400).json(resToSend('failed', errors))
  else next()
}

const existingEmail = async (req, res, next) => {
  try {
    const email = req.body.email
    console.log(`email : ${email}`)
    const check = await User.findOne({ where: { email: email } })
    console.log(`CHECK : ${check}`)
    check
      ? res
          .status(400)
          .json(
            resToSend('failed', [
              { param: 'email', msg: 'veuillez choisire un autre email' },
            ])
          )
      : next()
  } catch (error) {
    console.log(error)
  }
}

module.exports = {
  validateSignUp,
  signUpValidations,
  existingEmail,
}
