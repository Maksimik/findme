'use strict'

/**
 * Application configurations.
 * @type {any|*}
 */
const
  path = require('path'),
  _ = require('lodash'),

  environment = process.env.NODE_ENV || 'development',
  all = {
    env: environment,
    root: path.normalize(`${__dirname}${'/../../..'}`),
    port: process.env.PORT || 9000,
    ip: process.env.IP || '0.0.0.0'
  },
  configuration = _.merge(
    all,
    require(`./${environment}.js`) || {}
  )

module.exports = configuration
