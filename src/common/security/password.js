'use strict'

const scrypt = require('scrypt')
const scryptParameters = scrypt.paramsSync(0.1)

const hash = async (pwd) => {
  let hashed = await scrypt.kdf(pwd, scryptParameters)
  return hashed.toString('Base64')
}

const verify = async (plainPwd, hashedPwd) => {
  return scrypt.verifyKdf(Buffer.from(hashedPwd, 'Base64'), plainPwd)
}

module.exports = {
  hash,
  verify
}
