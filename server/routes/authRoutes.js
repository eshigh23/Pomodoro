const express = require('express')
const router = express.Router()
const authController = require('../controllers/authController')
const authenticateUser = require('../middleware/authenticateUser')


router.get('/fetchUserForAuth', authenticateUser, authController.fetchUserForAuth)
router.post('/google', authController.handleGoogleLogin)
router.post('/login', authController.loginUser)
router.post('/logout', authController.logoutUser)
router.post('/register', authController.registerUser)
router.put('/resetPassword', authController.resetPassword)
router.post('/sendForgotPasswordLink', authController.sendforgotPasswordLink)

module.exports = router

