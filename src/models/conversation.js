const mongoose = require('mongoose')
const { Schema } = mongoose

const conversationSchema = new Schema({
    senderPSID: Number,
    senderName: String,
    senderBirthDate: Date,
    askedQuestions: {
        type: Number,
        default: 1
    },
    isOpen: {
        type: Boolean,
        default: true
    }
})

module.exports = mongoose.model('Conversation', conversationSchema)