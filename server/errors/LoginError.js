'use strict'

/**
 * Login error.
 * @param {string} message - error message that will be logged in the app log.
 * @param {string|json|object} [meta] - error metadata.
 * @return {object}
 */
function LoginError(message, meta) {
  this.message = message
  this.stack = new Error().stack
  this.errorType = this.name
  this.statusCode = 401
  this.code = 401
  this.userMessage = 'A user with this login already exists. Please, enter another login'
  this.meta = meta
  this.reason = 'Invalid Credentials'
}

LoginError.prototype = Object.create(Error.prototype)
LoginError.prototype.name = 'LoginError'

export default LoginError
