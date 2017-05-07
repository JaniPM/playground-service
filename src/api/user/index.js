'use strict'

const userApi = (server, options) => {
  const routeName = `${options.routePrefix}/users`
  const controller = options.controller

  server.post(routeName, controller.create)
  server.get(routeName, controller.find)
  server.get(routeName + '/:id', controller._findById, controller.findById)
  server.put(routeName + '/:id', controller._findById, controller.update)
  server.patch(routeName + '/:id', controller._findById, controller.update)
  server.del(routeName + '/:id', controller.delete)
}

module.exports = userApi
