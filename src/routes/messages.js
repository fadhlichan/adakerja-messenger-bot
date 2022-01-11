const express = require('express')
const router = express.Router()
const { getMessages, getMessage, deleteMessage } = require('../controllers/messages')

router.get('/messages', getMessages)
router.get('/message/:messageId', getMessage)
router.delete('/message/:messageId', deleteMessage)

module.exports = router