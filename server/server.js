'use strict'

import express from 'express'
import routes from './routes'
import http from 'http'

import config from './config/environment'
import configExpress from './config/express'
import {logger} from './core'
import {auth} from './middleware'

let
  app = express(),
  server = http.createServer(app)

/**
 * Initializes the server.
 * @param {Object} options The init options.
 * @returns {void}
 */
function init(options) {
  const authentication = options && options.auth ? options.auth : auth

  configExpress(app, routes, authentication)

  process.on('unhandledRejection', (error, promise) => {
    logger.log('error', 'server|init|process.on.unhandledRejection', {promise, error, stack: error.stack})
  })
}

/**
 * Starts the server.
 * @returns {void}
  */
function start() {
  server.listen(config.port, config.ip, () => {
    logger.log('info', 'server|start', {port: config.port, env: app.get('env')})
  })
}

function close() {
  server.close()
}

module.exports = {
  init: init,
  start: start,
  close: close,
  app: app
}
