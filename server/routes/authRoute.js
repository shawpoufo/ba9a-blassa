const express = require('express')
const router = express.Router()
const auth_controller = require('../controllers/authController')
const { validateEmail } = require('../Helper/emailSender')
const { loginValidations, validateLogin } = require('../Helper/loginValidation')
const {
  validateSignUp,
  signUpValidations,
} = require('../Helper/signUpValidation')
router.post(
  '/signUp',
  signUpValidations,
  validateSignUp,
  auth_controller.sign_up
)
router.post('/login', loginValidations, validateLogin, auth_controller.login)
router.post('/validateemail', validateEmail)
router.delete(
  '/logout',
  auth_controller.authenticateToken,
  auth_controller.logout
)
module.exports = router
