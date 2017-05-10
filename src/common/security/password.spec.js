'use strict'

const expect = require('chai').expect
const password = require('./password')

/* eslint-disable no-unused-expressions */
describe.only('Password', () => {
  it('should produce random hash every time', async function () {
    try {
      let plainPwd = 'P@ssw0rd'
      let plainPwd2 = 'P@ssw0rd'
      let hashedPwd = await password.hash(plainPwd)
      let hashedPwd2 = await password.hash(plainPwd2)

      expect(hashedPwd).to.not.equal(plainPwd)
      expect(hashedPwd2).to.not.equal(plainPwd2)
      expect(hashedPwd).to.not.equal(hashedPwd2)
    } catch (err) {
      expect.fail()
    }
  })

  it('should verify passwords', async function () {
    try {
      let validPwd = 'P@ssw0rd'
      let wrongPwd = 'Passw0rd'
      let hashedPwd = await password.hash(validPwd)

      let validPwdEquals = await password.verify(validPwd, hashedPwd)
      expect(validPwdEquals).to.be.true

      let wrongPwdEquals = await password.verify(wrongPwd, hashedPwd)
      expect(wrongPwdEquals).to.not.be.true
    } catch (err) {
      expect.fail()
    }
  })
})
