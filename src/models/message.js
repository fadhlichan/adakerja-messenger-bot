const mongoose = require('mongoose')
const { Schema } = mongoose

const messageSchema = new Schema({
    senderPSID: Number,
    text: String
})

module.exports = mongoose.model('Message', messageSchema)