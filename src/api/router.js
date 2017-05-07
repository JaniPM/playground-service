'user strict'

const UserService = require('./user/user-service')
const UserModel = require('./user/user-model')

/**
 * Wires up services that implements api to correct data stores/models
 * @param  {[type]} server  [restify server]
 */
const applyRoutes = (server) => {
  let routePrefix = 'api'

  require('./user')(server, {
    routePrefix: routePrefix,
    service: new UserService(UserModel)
  })
}

module.exports = {
  applyRoutes
}
