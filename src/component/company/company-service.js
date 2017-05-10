'use strict'

const Company = require('./company-model')

const create = (data) => new Company(data).save()

module.exports = {
  create
}
