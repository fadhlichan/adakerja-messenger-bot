const Message = require('../models/message')
const { catchAsync } = require('../utils/catchAsync')

exports.getMessages = catchAsync(async (req, res) => {
    const page = +req.query.page || 1
    const limit = 10
    const messages = await Message.find().limit(limit).skip((page - 1) * limit)
    const count = await Message.countDocuments()

    res.status(200).json({
        error: null,
        data: {
            totalPage: Math.ceil(count / limit),
            currentPage: page,
            messages: messages.map(msg => ({
                id: msg._id,
                senderPSID: msg.senderPSID,
                text: msg.text
            }))
        }
    })
})

exports.getMessage = catchAsync(async (req, res) => {
    const messageId = req.params.messageId
    const message = await Message.findById(messageId)

    res.status(200).json({
        error: null,
        data: {
            message: {
                id: message._id,
                senderPSID: message.senderPSID,
                text: message.text
            }
        }
    })
})

exports.deleteMessage = catchAsync(async (req, res) => {
    const messageId = req.params.messageId
    await Message.deleteOne({ id: messageId })
    res.sendStatus(204)
})