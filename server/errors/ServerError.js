'use strict'

/**
 * Login error.
 * @param {string} message - error message that will be logged in the app log.
 * @param {int} [code] - extra code that have app details (e.g. statusCode = 500, code = 1000 - db error).
 * @param {string|json|ovject} [meta] - error metadata.
 * @return {object}
 */
function ServerError(message, code, meta) {
  this.message = message || 'Unknown error'
  this.stack = new Error().stack
  this.errorType = this.name
  this.statusCode = 500
  this.code = code || 500
  this.userMessage = 'Server error. Something went wrong. Please try again.'
  this.meta = meta
}

ServerError.prototype = Object.create(Error.prototype)
ServerError.prototype.name = 'ServerError'

export default ServerError
