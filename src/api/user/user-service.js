'use strict'

const errors = require('restify-errors')
const InvalidArgumentError = require('src/common/custom-errors').InvalidArgumentError
const log = require('src/common/log')

/**
 * Implements the user-api
 */
class UserService {
  constructor (Model) {
    if (!Model) {
      throw new InvalidArgumentError(
        `${this.constructor.name} is missing data model`
      )
    }

    this.Model = Model
    this.name = this.constructor.name

    log.debug('%s connected to store: %s', this.name, this.Model.modelName)

    this.find = this.find.bind(this)
    this._findById = this._findById.bind(this)
    this.findById = this.findById.bind(this)
    this.create = this.create.bind(this)
    this.update = this.update.bind(this)
    this.delete = this.delete.bind(this)
  }

  _handleError (err, next) {
    log.error('%s error: %s', this.name, err.name)

    switch (err.name) {
      case 'ValidationError':
        next(new errors.BadRequestError())
        break
      default:
        next(new errors.InternalServerError())
        break
    }
  }

  /**
   * Find all users
   */
  find (req, res, next) {
    this.Model.find().then((users) => {
      res.send(users)
      next()
    }).catch((err) => this._handleError(err, next))
  }

  /**
   * Helper route handler
   * Find user by id and store in request for the next handler (GET, PUT, PATCH)
   */
  _findById (req, res, next) {
    this.Model.findById(req.params.id).then((user) => {
      if (!user) {
        return this._handleError(new errors.NotFoundError(), next)
      }

      req.user = user
      next()
    }).catch((err) => this._handleError(err, next))
  }

  /**
   * Find by id
   */
  findById (req, res, next) {
    res.send(req.user)
    next()
  }

  /**
   * Create new user
   */
  create (req, res, next) {
    let data = req.body
    let model = new this.Model(data)

    model.save().then((savedModel) => {
      res.send(201, savedModel)
      next()
    }).catch((err) => this._handleError(err, next))
  }

  /**
   * Update existing user
   * Updates only the properties that are given in request body.
   */
  update (req, res, next) {
    let data = req.body
    let user = req.user

    Object.assign(user, data).save().then((updatedUser) => {
      res.send(updatedUser)
      next()
    }).catch((err) => this._handleError(err, next))
  }

  /**
   * Delete user by id
   */
  delete (req, res, next) {
    this.Model.findByIdAndRemove(req.params.id).then((user) => {
      res.send(user)
      next()
    }).catch((err) => this._handleError(err, next))
  }
}

module.exports = UserService
