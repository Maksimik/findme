'use strict'

/**
 * Authentication error.
 * @param {string} message - error message that will be logged in the app log.
 * @param {string|json|object} [meta] - error metadata.
 * @return {object}
 */
function AuthenticationError(message, meta) {
  this.message = message
  this.stack = new Error().stack
  this.errorType = this.name
  this.statusCode = 401
  this.code = 401
  this.userMessage = 'Unauthorized request.'
  this.meta = meta
  this.reason = message || 'Invalid token'
}

AuthenticationError.prototype = Object.create(Error.prototype)
AuthenticationError.prototype.name = 'AuthenticationError'

export default AuthenticationError
