const mongoose = require('mongoose')
const config = require('../')

// plugin bluebird promise in mongoose
mongoose.Promise = global.Promise

// connect to mongo db
mongoose.connect(config.db, { server: { socketOptions: { keepAlive: 1 } } })
mongoose.connection.on('error', () => {
  throw new Error(`unable to connect to database: ${config.db}`)
})

mongoose.connection.once('open', () => {
  console.log('Connected to DB!')
})

module.exports = mongoose
