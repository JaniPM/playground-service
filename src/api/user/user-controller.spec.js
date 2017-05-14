'use strict'

const expect = require('chai').expect
const sinon = require('sinon')
const mongoTypes = require('mongoose').Types
const errors = require('restify-errors')
const faker = require('faker')
const helpers = require('test/helpers.spec')
const InvalidArgumentError = require('src/common/custom-errors').InvalidArgumentError
const UserController = require('./user-controller')

/* eslint-disable no-unused-expressions */

// skipt for now, user controller will be changed to same as company controller
describe.skip('UserController', () => {
  let Model = null
  let fakeUser = null
  let next = null
  let req = null
  let res = null

  beforeEach(() => {
    // Mock the mongoose model
    Model = function () {}
    Model.find = function () {}
    Model.findById = function () {}
    Model.findByIdAndRemove = function () {}
    Model.modelName = 'User'
    Model.prototype.save = function () {} // Part of the document instance

    fakeUser = {
      _id: mongoTypes.ObjectId(),
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email()
    }

    next = function () {}
    req = { params: {}, body: {} }
    res = { send: function () {} }
  })

  describe('constructor', () => {
    it('should throw InvalidArgumentError when missing model', () => {
      expect(() => new UserController()).to.throw(InvalidArgumentError)
    })
  })

  describe('_handleError', () => {
    let controller = null

    beforeEach(() => {
      controller = new UserController(Model)
    })

    it('should throw BadRequestError on ValidationError', () => {
      let error = { name: 'ValidationError' }
      let expectedError = new errors.BadRequestError()
      next = sinon.spy()
      controller._handleError(error, next)

      expect(next.calledWithMatch(expectedError)).to.be.true
    })

    it('should throw InternalServerError on default case', () => {
      let error = { name: 'FooError' }
      let expectedError = new errors.InternalServerError()
      next = sinon.spy()
      controller._handleError(error, next)

      expect(next.calledWithMatch(expectedError)).to.be.true
    })
  })

  describe('find', () => {
    it('should return all users', (done) => {
      sinon.stub(Model, 'find').resolves([fakeUser])

      res = {
        send: (users) => {
          try {
            expect(users).to.deep.equal([fakeUser])
            done()
          } catch (err) {
            done(err)
          }
        }
      }

      let controller = new UserController(Model)
      controller.find(req, res, next)
    })

    it('should handle errors', (done) => {
      sinon.stub(Model, 'find').rejects()

      let controller = new UserController(Model)
      sinon.stub(controller, '_handleError').callsFake(
        (err, next) => helpers.fakeErrorHandler(err, done)
      )

      controller.find()
    })
  })

  describe('_findById', () => {
    it('should find user by id and store it in request for next handler', (done) => {
      sinon.stub(Model, 'findById').resolves(fakeUser)
      req.params.id = fakeUser._Id

      next = sinon.stub()
      next.callsFake(() => {
        try {
          expect(req.user).to.deep.equal(fakeUser)
          done()
        } catch (err) {
          done(err)
        }
      })

      let controller = new UserController(Model)
      controller._findById(req, res, next)
    })

    it('should send NotFoundError when user is not found', (done) => {
      let expectedError = new errors.NotFoundError()
      sinon.stub(Model, 'findById').resolves(null)

      next = sinon.stub()
      next.callsFake((err) => {
        try {
          expect(err.name).to.equal(expectedError.name)
          done()
        } catch (err) {
          done(err)
        }
      })

      let controller = new UserController(Model)
      controller._findById(req, res, next)
    })

    it('should handle errors', (done) => {
      sinon.stub(Model, 'findById').rejects()
      req.params.id = fakeUser._Id

      let controller = new UserController(Model)
      sinon.stub(controller, '_handleError').callsFake(
        (err, next) => helpers.fakeErrorHandler(err, done)
      )

      controller._findById(req)
    })
  })

  describe('findById', () => {
    it('should put already found user to response and call next', () => {
      req.user = fakeUser
      let spySend = sinon.spy(res, 'send')
      let spyNext = sinon.spy(next)

      let controller = new UserController(Model)
      controller.findById(req, res, spyNext)

      expect(spySend.calledWithMatch(fakeUser)).to.be.true
      expect(spyNext.called).to.be.true
    })
  })

  describe('create', () => {
    it('should create user and send it to response with status 201', (done) => {
      sinon.stub(Model.prototype, 'save').resolves(fakeUser)

      res = {
        send: (statusCode, user) => {
          try {
            expect(statusCode).to.equal(201)
            expect(user).to.deep.equal(fakeUser)
            done()
          } catch (err) {
            done(err)
          }
        }
      }

      let controller = new UserController(Model)
      controller.create(req, res, next)
    })

    it('should handle errors', (done) => {
      sinon.stub(Model.prototype, 'save').rejects()

      let controller = new UserController(Model)
      sinon.stub(controller, '_handleError').callsFake(
        (err, next) => helpers.fakeErrorHandler(err, done)
      )

      controller.create(req, res, next)
    })
  })

  describe('update', () => {
    it('should update user and send it to response', (done) => {
      let updatedUser = Object.assign({}, fakeUser, req.body)
      req.user = fakeUser
      req.user.save = () => {}
      req.body = { firstName: 'changed name' }

      sinon.stub(req.user, 'save').resolves(updatedUser)

      res = {
        send: (user) => {
          try {
            expect(user).to.deep.equal(updatedUser)
            done()
          } catch (err) {
            done(err)
          }
        }
      }

      let controller = new UserController(Model)
      controller.update(req, res, next)
    })

    it('should handle errors', (done) => {
      req.user = fakeUser
      req.user.save = () => {}
      req.body = { firstName: 'changed name' }

      sinon.stub(req.user, 'save').rejects()

      let controller = new UserController(Model)
      sinon.stub(controller, '_handleError').callsFake(
        (err, next) => helpers.fakeErrorHandler(err, done)
      )

      controller.update(req, res, next)
    })
  })

  describe('delete', () => {
    it('should delete by id and response with deleted user', (done) => {
      sinon.stub(Model, 'findByIdAndRemove').resolves(fakeUser)
      req.params.id = fakeUser._Id
      res = {
        send: (user) => {
          try {
            expect(user).to.deep.equal(fakeUser)
            done()
          } catch (err) {
            done(err)
          }
        }
      }

      let controller = new UserController(Model)
      controller.delete(req, res, next)
    })

    it('should handle errors', (done) => {
      sinon.stub(Model, 'findByIdAndRemove').rejects()

      let controller = new UserController(Model)
      sinon.stub(controller, '_handleError').callsFake(
        (err, next) => helpers.fakeErrorHandler(err, done)
      )

      controller.delete(req, res, next)
    })
  })
})
