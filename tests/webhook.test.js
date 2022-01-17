require('../src/utils/dotenv')
const request = require('supertest')
const app = require('../src/app')

const VERIFY_TOKEN = process.env.VERIFY_TOKEN

describe('Testing Webhook API', () => {
    test('Endpoint GET /webhook should return status code 200 if verified', async () => {
        const response = await request(app).get(`/webhook?hub.verify_token=${VERIFY_TOKEN}&hub.challenge=CHALLENGE_ACCEPTED&hub.mode=subscribe`)
        expect(response.statusCode).toBe(200)
        expect(response.text).toBe('CHALLENGE_ACCEPTED')
    })

    test('Endpoint GET /webhook should return status code 403 if not verified', async () => {
        const response = await request(app).get(`/webhook?hub.verify_token=WRONG_TOKEN&hub.challenge=CHALLENGE_ACCEPTED&hub.mode=subscribe`)
        expect(response.statusCode).toBe(403)
    })

    test('Endpoint POST /webhook should return status code 200 if event from page subcription', async () => {
        const response = await request(app).post(`/webhook`).send({ "object": "page", "entry": [] })
        expect(response.statusCode).toBe(200)
        expect(response.text).toBe('EVENT_RECEIVED')
    })

    test('Endpoint POST /webhook should return status code 404 if event not from page subcription', async () => {
        const response = await request(app).post(`/webhook`).send({})
        expect(response.statusCode).toBe(404)
    })
})