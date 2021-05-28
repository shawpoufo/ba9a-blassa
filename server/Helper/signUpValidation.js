const { body, validationResult } = require('express-validator')
const { resToSend } = require('./resToSend')

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

module.exports = { validateSignUp, signUpValidations }
