const express = require('express')
const router = express.Router()
const authenticateUser = require('../middleware/authenticateUser')
const studySessionController = require('../controllers/studySessionController')
const statsController = require('../controllers/statsController')

router.post('/create', authenticateUser, studySessionController.createStudySession)
router.get('/stats', authenticateUser, statsController.getStats)

module.exports = router