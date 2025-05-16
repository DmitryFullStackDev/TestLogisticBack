require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const routes = require('./routes')
const errorHandler = require('./middleware/ErrorHandlingMiddleware')

const app = express()

const allowedOrigins = process.env.CORS_ALLOWED_ORIGINS
    ? process.env.CORS_ALLOWED_ORIGINS.split(',')
    : []

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin) return callback(null, true)
    if (allowedOrigins.includes(origin)) {
      return callback(null, true)
    } else {
      return callback(new Error('Not allowed by CORS'))
    }
  },
  credentials: true,
}

app.use(cors(corsOptions))

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use('/', routes)
app.use(errorHandler)

app.get('/', (req, res) => {
  res.status(200).send('Hello server is running').end()
})

// Start the server
const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`)
  console.log('Press Ctrl+C to quit.')
})
