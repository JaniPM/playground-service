'use strict'

const User = require('./user-model')

/**
 * Creates new user
 * @param  {User} user new user to create
 * @return {Promise}
 */
const create = (user) => new User(user).save()

/**
 * Finds user by id
 * @param  {ObjectId} id User id
 * @return {Promise}
 */
const findById = (id) => User.findById(id)

module.exports = {
  create,
  findById
}
