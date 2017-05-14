'use strict'

const mongoose = require('mongoose')
const log = require('src/common/log')
const createdModified = require('mongoose-createdmodified').createdModifiedPlugin
const pwd = require('src/common/security/password')

const UserSchema = new mongoose.Schema({
  company_id: { type: mongoose.Schema.Types.ObjectId, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true }
})

UserSchema.plugin(createdModified, { index: true })

UserSchema.pre('save', async function (next) {
  let user = this

  // Hash the password if it has been modified (or is new)
  if (!user.isModified('password')) return next()

  try {
    user.password = await pwd.hash(user.password)
    next()
  } catch (error) {
    log.error('Error when hashing password for user: %s' + error.message)
    next(error)
  }
})

UserSchema.methods.verifyPassword = async function (candidatePwd, cb) {
  return pwd.verify(candidatePwd, this.password)
}

/**
 * Overrides default toJSON in order to strip out confidential fields
 * (e.g. password)
 * @return {JSON} User-object in JSON format
 */
UserSchema.methods.toJSON = function () {
  log.debug('User to json')
  let obj = this.toObject()
  delete obj.password
  return obj
}

module.exports = mongoose.model('User', UserSchema)
