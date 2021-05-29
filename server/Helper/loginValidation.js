const { body, validationResult } = require('express-validator')
const { resToSend } = require('./resToSend')

const loginValidations = [
  body('email')
    .notEmpty()
    .withMessage('email obligatoire')
    .isEmail()
    .withMessage('format incorrecte'),
  body('password').notEmpty().withMessage('mot de passe obligatoire'),
]
const validateLogin = (req, res, next) => {
  const errors = validationResult(req).array()
  if (errors.length) return res.status(400).json(resToSend('failed', errors))
  else next()
}

module.exports = { validateLogin, loginValidations }
