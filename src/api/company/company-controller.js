'use strict'
const log = require('src/common/log')
const errorHandler = require('src/common/error-handler')
const UserService = require('src/component/user/user-service')

/**
 * Create new company
 */
const create = async (req, res, next) => {
  try {
    log.debug('First create company')
    log.debug('Then create user')

    let user = await UserService.create(req.body.user)

    log.debug('Create user with: ' + user._id)

    res.send(201, user)
    next()
  } catch (err) {
    errorHandler(err, next)
  }

}

module.exports = {
  create
}
