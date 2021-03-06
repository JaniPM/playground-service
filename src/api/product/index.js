'use strict'

const productsApi = (server, options) => {
  const routeName = `${options.routePrefix}/products`
  const service = options.service

  server.post(routeName, service.create)
  server.get(routeName, service.find)
  server.get(routeName + '/:id', service._findById, service.findById)
  server.put(routeName + '/:id', service._findById, service.update)
  server.patch(routeName + '/:id', service._findById, service.update)
  server.del(routeName + '/:id', service.delete)
}

module.exports = productsApi
