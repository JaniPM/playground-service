'use strict'

const passport = require('passport')
const passportJWT = require('passport-jwt')
const jwt = require('jsonwebtoken')
const log = require('src/common/log')

const ExtractJwt = passportJWT.ExtractJwt
const Strategy = passportJWT.Strategy

const options = {
  secretOrKey: 'tmpSecretHardCoded',
  jwtFromRequest: ExtractJwt.fromAuthHeader()
}

const initialize = () => {
  const strategy = new Strategy(options, (payload, next) => {
    // TODO schema validate token
    log.info('JWT payload: %s', payload)
    next(payload)
  })

  passport.use(strategy)

  return passport.initialize()
}

const authenticate = () => {
  return passport.authenticate('jwt', { session: false })
}

const sign = (payload) => jwt.sign(payload, options.secretOrKey)

module.exports = {
  initialize,
  authenticate,
  sign
}
