'use strict'

const User = require('./user-model')

const create = (data) => new User(data).save()

module.exports = {
  create
}
