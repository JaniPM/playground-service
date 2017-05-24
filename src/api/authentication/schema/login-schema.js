'use strict'

const Joi = require('joi')

const schema = Joi.object().keys({
  email: Joi.string().email().required(),
  password: Joi.string().required()
}).required()

module.exports = schema
