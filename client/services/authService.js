'use strict'

import serviceBase from './serviceBase'

const authService = {

  /**
   * Sign in.
   * @param {object} credentials
   * @returns {*}
   */
  signIn: (credentials) => serviceBase.post(`/signIn`, credentials),

  /**
   * Sign up.
   * @param {Object} req
   * @returns {*}
   */
  signUp: (req) => serviceBase.post(`/signUp`, req)
}

export default authService
