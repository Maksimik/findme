'use strict'

import winston from 'winston'
require('winston-loggly-bulk')
import config from '../config/environment'

let transports = []
transports.push(new winston.transports.Console({
  'timestamp': true
}))

if (config.env !== 'development' && config.env !== 'test')
  transports.push(new winston.transports.Loggly({
    token: config.loggly.token,
    subdomain: config.loggly.subDomain,
    tags: config.loggly.tags.split(','),
    json: true
  }))

const logger = new winston.Logger({
  transports: transports
})

export default logger

