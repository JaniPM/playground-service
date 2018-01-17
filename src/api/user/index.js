'use strict'

const validationHandler = require('../schema-validation-handler')
const postSchema = require('./schema/user-schema')
const controller = require('./user-controller')

const applyRoutes = (server, options) => {
  const routeName = `${options.routePrefix}/users`

  server.get(routeName, controller.find)
  /*
  server.post(routeName, controller.create)
  server.get(routeName + '/:id', controller._findById, controller.findById)
  server.put(routeName + '/:id', controller._findById, controller.update)
  server.patch(routeName + '/:id', controller._findById, controller.update)
  server.del(routeName + '/:id', controller.delete)
  */

}

module.exports = {
  applyRoutes
}
