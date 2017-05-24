'use strict'

const errors = require('restify-errors')
const errorHandler = require('src/common/error-handler')
const UserService = require('src/component/user/user-service')
const auth = require('src/common/security/auth')

/**
 * Authenticates user with username (email) and password.
 * Creates JWT token so that clients can use it in order to authenticate to
 * rest of the apis
 * @param  {Request}  req  http-request with body.email and body.password
 * @param  {Response} res  http-response
 * @param  {Function} next next call-back
 * @return {Promise}
 */
const login = async (req, res, next) => {
  try {
    let email = req.body.email
    let password = req.body.password
    let user = await UserService.findByEmail(email)

    if (!user) {
      return next(new errors.NotFoundError('Cannot find user with email'))
    }

    let isValidPwd = await user.verifyPassword(password)

    if (!isValidPwd) {
      return next(new errors.NotFoundError('Invalid password'))
    }

    let payload = {
      user_id: user.id,
      company_id: user.company_id
    }

    let token = auth.sign(payload)

    res.send({token: token, user: user})
    next()
  } catch (err) {
    errorHandler(err, next)
  }
}

module.exports = {
  login
}
