const express = require('express')
const router = express.Router()
const auth_controller = require('../controllers/authController')
const { validateEmail } = require('../Helper/emailSender')
const { loginValidations, validateLogin } = require('../Helper/loginValidation')
const {
  validateSignUp,
  signUpValidations,
  existingEmail,
} = require('../Helper/signUpValidation')
const authenticateToken =
  require('../controllers/authController').authenticateToken
const { roleVerification, checkRole } = require('../Helper/roleVerification')
router.post(
  '/signUp',
  signUpValidations,
  validateSignUp,
  existingEmail,
  auth_controller.sign_up
)
router.post('/login', loginValidations, validateLogin, auth_controller.login)
router.post('/validateemail', validateEmail)
router.post('/checkrole', authenticateToken, checkRole)
module.exports = router
