require('./utils/dotenv')
const mongoose = require('mongoose')
const app = require('./app')
const PORT = process.env.PORT || 1337

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(PORT, () => {
            console.log('Webhook listening on port', PORT)
        })
    }).catch(e => {
        console.error(E)
    })
