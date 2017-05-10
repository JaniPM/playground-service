'use strict'

const mongoose = require('mongoose')
const createdModified = require('mongoose-createdmodified').createdModifiedPlugin

const UserSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true }
})

UserSchema.plugin(createdModified, { index: true })

module.exports = mongoose.model('User', UserSchema)
