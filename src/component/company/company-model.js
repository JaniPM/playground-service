'use strict'

const mongoose = require('mongoose')
const createdModified = require('mongoose-createdmodified').createdModifiedPlugin

const Schema = new mongoose.Schema({
  name: { type: String, required: true }
})

Schema.plugin(createdModified, { index: true })

module.exports = mongoose.model('Company', Schema)
