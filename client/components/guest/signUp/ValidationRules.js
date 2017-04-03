/**
 * Suggest a Webcast form validation rules
 */

'use strict'

const constraints = {
  login: {
    presence: true
  },
  password: {
    presence: true,
    length: {
      minimum: 3
    }
  }
}

export default constraints
