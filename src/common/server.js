'use strict'

const config = require('./config')
const restify = require('restify')
const bunyanWinston = require('bunyan-winston-adapter')
const dbConnection = require('./db-connection')
const log = require('./log')
const auth = require('./security/auth')

const server = restify.createServer({
  name: config.name,
  version: config.version,
  log: bunyanWinston.createAdapter(log)
})

// Middleware
//server.use(auth.initialize())
server.use(restify.jsonBodyParser({ mapParams: true }))
server.use(restify.acceptParser(server.acceptable))
server.use(restify.queryParser({ mapParams: true }))
server.use(restify.fullResponse())
/*
server.on('after', restify.auditLogger({
  log: bunyanWinston.createAdapter(log)
}))
*/

server.on('uncaughtException', (req, res, route, err) => {
  log.error('Unhandled error: %s', err.message)
  res.send(500)
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

  log.info(
    'Connecting to db in host: %s port: %d, database: %s.',
    process.env.MONGO_HOST, 
    process.env.MONGO_PORT,
    process.env.MONGO_DB_NAME
  )

  dbConnection(config.db.uri, config.db.options)
})

// Init all api routes from one file

require('../api/router').applyRoutes(server)
