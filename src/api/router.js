'user strict'

const UserController = require('./user/user-controller')
const UserModel = require('./user/user-model')

/**
 * Wires up controllers that implements api to correct data stores/models
 * @param  {[type]} server  [restify server]
 */
const applyRoutes = (server) => {
  let routePrefix = 'api'

  require('./user')(server, {
    routePrefix: routePrefix,
    controller: new UserController(UserModel)
  })
}

module.exports = {
  applyRoutes
}
