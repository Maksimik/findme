'use strict'

import {userDb} from '../db'
import jwt from 'jsonwebtoken'
import config from '../config/environment'
import {ServerError, AuthenticationError, logError, getResponseError} from '../errors'
const JWTConfig = config.JWT

/**
 * Sets the response error.
 * @param {object} res
 * @param {AuthenticationError|ServerError} error
 * @return {void}
 */
function setResponseError(res, error) {
  logError(error)
  const responseError = getResponseError(error)
  res.status(responseError.error.code).json(responseError)
}

export default {

  /**
   * Authenticates request.
   * @param {Object} req
   * @param {Object} req.body
   * @param {int} req.userId
   * @param {Object} req.query
   * @param {Object[]} req.headers
   * @param {string|null} req.body.token
   * @param {Object} res
   * @param {function} next
   * @return {void}
   */
  authenticate: (req, res, next) => {
    const token = req.body && req.body.token ||
      req.query && req.query.token ||
      req.headers && req.headers['x-access-token']
    if (!token) {
      setResponseError(res, new AuthenticationError('Token not found'))

      return
    }

     try {

      jwt.verify(token, JWTConfig.jwtSecret, (err, decoded) => {
        if (err) {
          setResponseError(res, new AuthenticationError('Token not found', err))

          return
        }

        req.userId = decoded.userId
        userDb.getById(req.userId)
          .then(user => {
            if (!user) {
              setResponseError(res, new AuthenticationError('User not found'))

              return
            }

            req.user = user

            next()
          })
      })
    } catch (err) {
      setResponseError(res, new ServerError(err.message || 'Unknown error'))
    }
  }
}
