require('./utils/dotenv')
const mongoose = require('mongoose')
const app = require('./app')
const db = require('./db')

const PORT = process.env.PORT || 1337
const MONGO_URI = process.env.MONGO_URI

const main = async () => {
    try {
        await db.connect(MONGO_URI)
        app.listen(PORT, () => {
            console.log('Webhook listening on port', PORT)
        })
    } catch (error) {
        console.error(error)
    }
}

main()
