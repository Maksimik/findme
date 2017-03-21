'use strict'

import path from 'path'
import config from './config/environment'
import logger from './core/logger'
import api from './api'
import authController from './api/authController'

/**
 * Defines routes.
 * @param {Object} app - express server.
 * @param {Object} auth - authentication processor.
 * @return {void}
 */
export default (app, auth) => {
  const indexFileName = config.env === 'development' ? 'index-dev.html' : 'index.html'
  const indexFile = path.resolve(`${app.get('clientPath')}/${indexFileName}`)
  logger.log('info', `route|route|indexFile:${indexFile}`, {environment: config.env})

  app.use('/api/signIn', authController.signIn)
  app.use('/api/signUp', authController.signUp)

  app.use('/api', auth.authenticate, api)

  app.route('/*').get((req, res) => {
    res.sendFile(indexFile)
  })
}
