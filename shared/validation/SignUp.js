/**
 * Suggest a SignUp form validation rules
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
    presence: true
  }
}

export default constraints
