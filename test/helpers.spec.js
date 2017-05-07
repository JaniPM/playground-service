'user strict'

const expect = require('chai').expect

/* eslint-disable no-unused-expressions */

/**
 * Makes sure that error handler is called with error in route handlers
 */
let fakeErrorHandler = (err, done) => {
  try {
    expect(err).to.exist
    done()
  } catch (err) {
    done(err)
  }
}

module.exports = {
  fakeErrorHandler
}
