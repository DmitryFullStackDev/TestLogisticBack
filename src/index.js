require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const routes = require('./routes')
const errorHandler = require('./middleware/ErrorHandlingMiddleware')

const app = express()

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use('/', routes)
app.use(errorHandler)

const start = async () => {
  try {
    app.listen(8080, () => console.log('run ' + process.env.PORT))
  } catch (e) {
    console.log(e)
  }
}

start()
