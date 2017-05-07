'use strict'

const config = require('./config')
const restify = require('restify')
const bunyanWinston = require('bunyan-winston-adapter')
const dbConnection = require('./db-connection')
const log = require('./log')

const server = restify.createServer({
  name: config.name,
  version: config.version,
  log: bunyanWinston.createAdapter(log)
})

// Middleware
server.use(restify.jsonBodyParser({ mapParams: true }))
server.use(restify.acceptParser(server.acceptable))
server.use(restify.queryParser({ mapParams: true }))
server.use(restify.fullResponse())
/*
server.on('after', restify.auditLogger({
  log: bunyanWinston.createAdapter(log)
}))
*/

// Logs the uncaughtExceptions but doesn't expose error details to response
server.on('uncaughtException', (req, res, route, err) => {
  log.error('Uncaught Exception: ' + err.stack)
  res.send(500, 'Internal Server Error')
})

// Start server and connect to MongoDB
server.listen(config.port, () => {
  log.info(
    '%s v%s ready to accept connections on port %d in %s environment.',
    server.name,
    config.version,
    config.port,
    config.env
  )

  dbConnection(config.db.uri, config.db.options)
})

// Init all api routes from one file
require('../api/router').applyRoutes(server)
