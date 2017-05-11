'use strict'

const Joi = require('joi')
const errorHandler = require('src/common/error-handler')

const schemaValidationHandler = (schema) => {
  return (req, res, next) => {
    const result = Joi.validate(req.body, schema)

    if (result.error) {
      return errorHandler(result.error, next)
    }

    // Pass value with type conversions forward for upcoming handlers
    req.body = result.value
    next()
  }
}

module.exports = schemaValidationHandler
