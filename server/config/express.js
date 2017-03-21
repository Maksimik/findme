'use strict'

/**
 * Express configuration.
 */

import express from 'express'
import path from 'path'
import helmet from 'helmet'
import compression from 'compression'
import bodyParser from 'body-parser'
import config from './environment'
import {getResponseError} from '../errors'

function appErrorHandler(err, req, res, next) { // eslint-disable-line no-unused-vars
  const responseError = getResponseError(err)

  return res.status(responseError.error.code).json(responseError)
}

export default (app, routes, auth) => {

  app.use(helmet())
  app.use(compression({}))
  app.use(bodyParser.urlencoded({extended: false}))
  app.use(bodyParser.json())

  app.set('clientPath', path.join(config.root, 'client/public'))
  app.use(express.static(path.join(config.root, 'client/public')))

  routes(app, auth)
  app.use(appErrorHandler)
}
