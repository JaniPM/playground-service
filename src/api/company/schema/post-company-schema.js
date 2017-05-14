'use strict'

const Joi = require('joi')
const userSchema = require('src/api/user/schema/user-schema')
const companySchema = require('./company-schema')

const defaultPwdPolicy = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/

const schema = Joi.object().keys({
  company: companySchema.required(),
  user: userSchema.keys({
    password: Joi.string().regex(defaultPwdPolicy).required()
  }).required()
}).required()

module.exports = schema
