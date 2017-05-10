'use strict'
const log = require('src/common/log')
const errorHandler = require('src/common/error-handler')
const UserService = require('src/component/user/user-service')
const CompanyService = require('src/component/company/company-service')

/**
 * Create new company
 */
const create = async (req, res, next) => {
  try {
    log.debug('First create company')
    let company = await CompanyService.create(req.body.company)

    log.debug('Then create user')
    let user = await UserService.create(
      Object.assign({}, req.body.user, { company_id: company._id })
    )

    res.send(201, {company: company, user: user})
    next()
  } catch (err) {
    errorHandler(err, next)
  }
}

module.exports = {
  create
}
