'use strict'

import _ from 'lodash'
import crypto from 'crypto'
import logger from '../core/logger'
import config from '../config/environment'

/**
 * User model.
 */
class User {

  /**
   * @param {Object} dbData
   * @param {int} dbData.id
   * @param {string} dbData.firstName
   * @param {string} dbData.lastName
   * @param {string} dbData.login
   * @param {string} dbData.password
   */
  constructor(dbData) {
    this.id = dbData.id
    this.firstName = dbData.firstName
    this.lastName = dbData.lastName
    this.login = dbData.login
    this.password = dbData.password
  }

  /**
   * @param {string} password
   * @returns {bool}
   * @description preparedHash is a fix for compatibility with PHP
   */
  validPassword(password) {
    try {
      const hashMethod = config.auth.hashMethod
      const hashSecret = config.auth.hashSecret

      const passwordHash = crypto.createHmac(hashMethod, hashSecret)
        .update(password)
        .digest('hex')

      return passwordHash === this.password
    } catch (error) {
      logger.error('User|validPassword', error)

      return false
    }
  }

  get commonDetails() {
    return _.pick(this, ['id', 'firstName', 'lastName', 'login'])
  }
}

export default User
