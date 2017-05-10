'use strict'

const controller = require('./company-controller')

const applyRoutes = (server, options) => {
  const routeName = `${options.routePrefix}/companies`

  server.post(routeName, controller.create)
}

module.exports = {
  applyRoutes
}
