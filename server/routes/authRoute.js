const express = require('express')
const router = express.Router()
const auth_controller = require('../controllers/authController')

router.post('/signUp', auth_controller.passwordValidationMidelware, auth_controller.sign_up)
router.post('/signIn', auth_controller.passwordValidationMidelware, auth_controller.login)
router.delete('/logout', auth_controller.authenticateToken, auth_controller.logout)
module.exports = router