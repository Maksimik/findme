'use strict'

/**
 * Development configuration.
 */
module.exports = {
  port: 9000,
  database: {
    default: {
      host: 'localhost',
      database: 'findme',
      userName: 'root',
      password: '2370'
    }
  },
  auth: {
    hashMethod: 'sha256',
    hashSecret: 'ladjoqwue89LHJIOUYHMNL987908yuNJLP'
  },
  JWT: {
    // @TODO change secret
    jwtSecret: '4qQ175vAzvptNaxFt0P3w62TwIVdJqu8',
    expirationPeriod: '15 days'
  },
  logLevel: 'debug'
}
