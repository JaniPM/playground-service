'use strict'

const validationHandler = require('../schema-validation-handler')
const postSchema = require('./schema/post-company-schema')
const controller = require('./company-controller')

const applyRoutes = (server, options) => {
  const routeName = `${options.routePrefix}/companies`

  server.post(routeName, validationHandler(postSchema), controller.create)
}

module.exports = {
  applyRoutes
}
