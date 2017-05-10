const errors = require('restify-errors')
const log = require('src/common/log')

/**
 * Common error handler function for unhandled exceptions
 * @param  {Error}   err  [JS Error object]
 * @param  {Function} next [Restify next callback]
 */
const handleError = (err, next) => {
  log.error('Caught error: %s', err.name)

  switch (err.name) {
    case 'ValidationError':
      next(new errors.BadRequestError(err.message))
      break
    case 'NotFoundError':
      next(new errors.NotFoundError(err.message))
      break
    default:
      next(new errors.InternalServerError(err.message))
      break
  }
}

module.exports = handleError
