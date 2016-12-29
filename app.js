const express = require('express')
const dotenv = require('dotenv')
const logger = require('morgan')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const compress = require('compression')
const methodOverride = require('method-override')
const cors = require('cors')
const mongoose = require('mongoose')

/**
 * Load environment variables from .env file, where API keys and passwords are configured.
 */
dotenv.load()

/**
 * Create Express server.
 */
const app = express()

if (process.env.NODE_ENV === 'development') {
  app.use(logger('dev'))
}

const routes = require('./routes')

/**
 * Connect to MongoDB.
 */
mongoose.Promise = global.Promise
mongoose.connect(process.env.MONGODB_URI || process.env.MONGOLAB_URI, {
  server: { socketOptions: { keepAlive: 1 } }
})
mongoose.connection.on('error', () => {
  throw new Error(`MongoDB connection error. Please make sure MongoDB is running.`)
})

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use(cookieParser())
app.use(compress())
app.use(methodOverride())

app.use(cors())

// mount all routes on /api path
app.use('/api', routes)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found')
  err.status = 404
  next(err)
})

// error handlers

// development error handler
// will print stacktrace
if (process.env.NODE_ENV === 'development') {
  app.use(function (err, req, res, next) {
    res.status(err.status || 500)
    res.json({
      error: {
        message: err.message,
        error: err
      }
    })
  })
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
  res.status(err.status || 500)
  res.json({
    error: {
      message: err.message,
      error: {}
    }
  })
})

module.exports = app
