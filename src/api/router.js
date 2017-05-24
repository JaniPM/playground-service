'user strict'

/*
const UserController = require('./user/user-controller')
const UserModel = require('./user/user-model')
*/

/**
 * Wires up controllers that implements api to correct data stores/models
 * @param  {Object} server  [restify server]
 */
const applyRoutes = (server) => {
  let routePrefix = 'api'

  server.get(routePrefix, (req, res, next) => {
    res.send('Welcome!')
    next()
  })

  let apis = [
    'company'
  ]

  apis.forEach((name) => {
    require(`./${name}`).applyRoutes(server, { routePrefix: routePrefix })
  })
}

module.exports = {
  applyRoutes
}
