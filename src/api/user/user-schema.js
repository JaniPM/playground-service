'use strict'

const Joi = require('joi')

const schema = Joi.object({
  firstName: Joi.string().min(1).max(30).required(),
  lastName: Joi.string().min(1).max(30).required(),
  email: Joi.string().email().required()
})

module.exports = schema
