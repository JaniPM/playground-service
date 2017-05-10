'use strict'

const mongoose = require('mongoose')
const createdModified = require('mongoose-createdmodified').createdModifiedPlugin

const UserSchema = new mongoose.Schema({
  company_id: { type: mongoose.Schema.Types.ObjectId, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true }
})

UserSchema.plugin(createdModified, { index: true })

module.exports = mongoose.model('User', UserSchema)
