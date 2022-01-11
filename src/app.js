const express = require('express')
const cors = require('cors')
const routes = require('./routes')
const { notFound, internalServerError } = require('./controllers/errors')

const app = express()
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())

app.use(routes.webhook)
app.use(routes.messages)
app.use(notFound)
app.use(internalServerError)

module.exports = app