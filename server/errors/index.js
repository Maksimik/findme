'use strict'

import LoginError from './LoginError'
import SignInError from './SignInError'
import ServerError from './ServerError'
import AuthenticationError from './AuthenticationError'

/**
 * Gets error for API response.
 * @param {Error|object} error
 * @param {int} error.statusCode
 * @param {string} error.userMessage
 * @returns {{error: {code: (int), message: (string)}}}
 */
function getResponseError(error = new Error('Unknown error')) {
  const resultError = error.statusCode ? error : new ServerError(error.message)
  const response = {
    error: {
      code: resultError.statusCode,
      message: resultError.userMessage
    }
  }

  if (error.validationErrors) {
    response.error.validation = error.validationErrors
  }

  return response
}

/**
 * Logs error.
 * @param {Error|object} error
 * @constructor
 */
function logError(error) {
  return !error
}

module.exports = {
  LoginError,
  ServerError,
  SignInError,
  AuthenticationError,
  getResponseError,
  logError: logError
}
