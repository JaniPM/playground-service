'use strict'

const validationHandler = require('../schema-validation-handler')
const loginSchema = require('./schema/login-schema')
const controller = require('./authentication-controller')

const applyRoutes = (server, options) => {
  const routeName = `${options.routePrefix}/authentication`

  server.post(
    `${routeName}/login`,
    validationHandler(loginSchema),
    controller.login
  )
}

module.exports = {
  applyRoutes
}
