const express = require('express')
const router = express.Router()
const authenticateUser = require('../middleware/authenticateUser')
const userController = require('../controllers/userController')

router.post('/addSubjects', authenticateUser, userController.addSubjects)

module.exports = router