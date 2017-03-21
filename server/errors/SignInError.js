'use strict'

/**
 * Login error.
 * @param {string} message - error message that will be logged in the app log.
 * @param {string|json|object} [meta] - error metadata.
 * @return {object}
 */
function SignInError(message, meta) {
  this.message = message
  this.stack = new Error().stack
  this.errorType = this.name
  this.statusCode = 401
  this.code = 401
  this.userMessage = 'Sign in has failed. Please, try again'
  this.meta = meta
  this.reason = 'Invalid Credentials'
}

SignInError.prototype = Object.create(Error.prototype)
SignInError.prototype.name = 'SignInError'

export default SignInError
