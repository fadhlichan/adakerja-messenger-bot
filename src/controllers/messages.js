const Message = require('../models/message')
const { catchAsync } = require('../utils/catchAsync')

exports.getMessages = catchAsync(async (req, res) => {
    const messages = await Message.find()
    res.status(200).json(messages)
})

exports.getMessage = catchAsync(async (req, res) => {
    const messageId = req.params.messageId
    const message = await Message.findById(messageId)
    res.status(200).json(message)
})

exports.deleteMessage = catchAsync(async (req, res) => {
    const messageId = req.params.messageId
    await Message.deleteOne({ id: messageId })
    res.sendStatus(204)
})