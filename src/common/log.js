'use strict'

const winston = require('winston')

const log = new winston.Logger({
  transports: [
    new winston.transports.Console({
      level: process.env.LOG_LEVEL,
      timestamp: () => new Date().toString(),
      json: true
    })
  ]
})

module.exports = log
