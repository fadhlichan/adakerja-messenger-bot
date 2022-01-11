const axios = require('axios')
const Message = require('../models/message')
const Conversation = require('../models/conversation')
const questions = require('../constants/questions')
const responses = require('../constants/responses')
const { daysUntilNextBirthDay } = require('../utils/birthDate')

exports.handleMessage = async (senderPSID, receivedMessage) => {
    const response = {}

    if (receivedMessage.text) {
        const message = new Message({ senderPSID, text: receivedMessage.text })
        const conversation = await Conversation.findOne({ senderPSID, isOpen: true })

        if (!conversation) {
            await Conversation.create({ senderPSID })
            response.text = questions.askName
        } else {
            const { askedQuestions } = conversation
            if (askedQuestions === 1) {
                conversation.senderName = receivedMessage.text
                conversation.askedQuestions++
                await conversation.save()

                response.text = `Hi ${receivedMessage.text}, ${questions.askBirthDate}`
            }

            else if (askedQuestions === 2) {
                conversation.senderBirthDate = new Date(receivedMessage.text)
                conversation.askedQuestions++
                await conversation.save()

                response.text = questions.askNextBirthDay
            }

            else if (askedQuestions === 3) {
                const isAskingNextBirthDay = receivedMessage.text.toLowerCase()
                if (responses['yes'].includes(isAskingNextBirthDay)) {
                    const { senderBirthDate } = conversation
                    response.text = `There are ${daysUntilNextBirthDay(senderBirthDate)} days left until your next birthday`
                }

                else if (responses['no'].includes(isAskingNextBirthDay)) {
                    response.text = `Goodbye`
                }

                else {
                    response.text = `I don't know what you are talking about`
                }

                conversation.isOpen = false
                await conversation.save()
            }
        }

        await message.save()
    }

    this.callSendAPI(senderPSID, response)
}

exports.callSendAPI = (senderPSID, response) => {
    const body = {
        recipient: {
            id: senderPSID
        },
        message: response
    }

    axios
        .post(`https://graph.facebook.com/v2.6/me/messages?access_token=${process.env.PAGE_ACCESS_TOKEN}`, body)
        .then(response => console.log('message sent'))
        .catch(error => console.error('Unable to send message: ' + error))
}

