/**
 * Suggest a Webcast form validation rules
 */

'use strict'

const constraints = {
  firstName: {
    presence: true
  },
  lastName: {
    presence: true
  },
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
