'use strict'

const mongoose = require('mongoose')
const log = require('./log')

const dbConnection = function (uri, options) {
  mongoose.connection.on('error', (err) => {
    log.error('Mongoose error: ' + err)
    process.exit(1)
  })

  mongoose.connection.on('connected', () => {
    log.info('Mongoose connected to uri: %s', uri)
  })

  mongoose.connection.on('error', (err) => {
    log.error('Mongoose connection error: ' + err)
  })

  mongoose.connection.on('disconnected', () => {
    log.info('Mongoose connection disconnected')
  })

  // If the Node process ends, close the Mongoose connection
  process.on('SIGINT', () => {
    mongoose.connection.close(() => {
      log.info('Mongoose connection disconnected through app termination')
      process.exit(0)
    })
  })

  // User ES6 promises with mongoose
  mongoose.Promise = global.Promise

  return mongoose.connect(uri, options)
}

module.exports = dbConnection
