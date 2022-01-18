require('../../src/utils/dotenv')
const request = require('supertest')
const app = require('../../src/app')
const db = require('../../src/db')
const Message = require('../../src/models/message')

const MONGO_URI = process.env.MONGO_URI_TEST

const createMessage = async (userId, text) => {
    return Message.create({
        senderPSID: userId,
        text: text
    })
}

describe('Testing messages API', () => {
    beforeAll(async () => await db.connect(MONGO_URI))
    afterEach(async () => await db.clear())
    afterAll(async () => await db.close())

    test('Endpoint GET /message/:id should return a single message', async () => {
        const message1 = await createMessage(1, 'text 1')
        const message2 = await createMessage(2, 'text 2')

        const response1 = await request(app).get('/message/' + message1._id.toString())
        expect(response1.statusCode).toBe(200)
        expect(response1.body).toStrictEqual({
            error: null,
            data: {
                message: {
                    id: message1._id.toString(),
                    senderPSID: 1,
                    text: 'text 1'
                }
            }
        })

        const response2 = await request(app).get('/message/' + message2._id.toString())
        expect(response2.statusCode).toBe(200)
        expect(response2.body).toStrictEqual({
            error: null,
            data: {
                message: {
                    id: message2._id.toString(),
                    senderPSID: 2,
                    text: 'text 2'
                }
            }
        })
    })

    test('Endpoint GET /messages should return data message', async () => {
        const message1 = await createMessage(1, 'text 1')
        const response1 = await request(app).get('/messages')
        expect(response1.statusCode).toBe(200)
        expect(response1.body).toStrictEqual({
            error: null,
            data: {
                totalPage: 1,
                currentPage: 1,
                messages: [
                    {
                        id: message1._id.toString(),
                        senderPSID: 1,
                        text: 'text 1'
                    }
                ]
            }
        })

        const message2 = await createMessage(2, 'text 2')
        const response2 = await request(app).get('/messages')
        expect(response2.statusCode).toBe(200)
        expect(response2.body).toStrictEqual({
            error: null,
            data: {
                totalPage: 1,
                currentPage: 1,
                messages: [
                    {
                        id: message1._id.toString(),
                        senderPSID: 1,
                        text: 'text 1'
                    },
                    {
                        id: message2._id.toString(),
                        senderPSID: 2,
                        text: 'text 2'
                    }
                ]
            }
        })
    })

    test('Endpoint DELETE /message/:id should delete a message', async () => {
        const message1 = await createMessage(1, 'text 1')
        const message2 = await createMessage(2, 'text 2')

        const response1 = await request(app).delete('/message/' + message1._id.toString())
        expect(response1.statusCode).toBe(204)
        expect(await Message.findOne({ senderPSID: 1 })).toBeNull()

        const response2 = await request(app).delete('/message/' + message2._id.toString())
        expect(response2.statusCode).toBe(204)
        expect(await Message.findOne({ senderPSID: 2 })).toBeNull()
    })
})