'use strict'

import jwt from 'jsonwebtoken'
import {SignInError} from '../errors'
import config from '../config/environment'
import {userDb, userRolesDb} from '../db'
import {User} from '../models'
import crypto from 'crypto'

export default {

  /**
   * Sign in.
   * @param {string} login
   * @param {string} password
   * @return {{token: *, user: *}}
   * @throws {SignInError}
   */
  signIn(login, password) {
    if (this.invalidLoginRequest(login, password)) throw new SignInError('Invalid parameters', {login})

    return userDb.getByLogin(login)
      .then(user => this.getLoginResponse(user, login, password))
  },


  /**
   * Sign up.
   * @param {Object} params
   * @returns {Array}
   * @throws {LoginError}
   */
  signUp(params) {

    return userDb.getByLogin(params.login)
      .then(user => {

        if (user) return {error: 'A user with this login already exists'}

        const data = this.getPreparedToSave(params)
        const hashMethod = config.auth.hashMethod
        const hashSecret = config.auth.hashSecret

        const passwordHash = crypto.createHmac(hashMethod, hashSecret)
          .update(data.password)
          .digest('hex')

        data.password = passwordHash

        return userDb.insert(data)
          .then(userId => {
            data.id = userId

            return userRolesDb.insert(userId, 2)
              .then(() => ({
                token: this.generateToken(userId),
                user: new User(data)
              }))
          })

      })
  },

  getPreparedToSave(user) {
    return {
      firstName: user.firstName,
      lastName: user.lastName,
      login: user.login,
      password: user.password
    }
  },

  /**
   * Validates login request parameters.
   * @param {string} login
   * @param {string} password
   * @return {boolean}
   */
  invalidLoginRequest(login, password) {
    if (!password || !login) {
      return true
    }

    return false
  },

  /**
   * Generates JWT token.
   * @param {int} id
   * @return {string}
   */
  generateToken(id) {
    const payload = {
      userId: id
    }

    return jwt.sign(payload, config.JWT.jwtSecret, {
      expiresIn: config.JWT.expirationPeriod
    })
  },

  /**
   * Validates user and returns login response.
   * @param {object} user
   * @param {string} login
   * @param {string} password
   * @return {{token: *, user: *}}
   * @throws {LoginError}
   */
  getLoginResponse(user, login, password) {
    if (!user) throw new SignInError('User Not Found', {login})

    if (!user.validPassword(password)) throw new SignInError('Invalid password', login)

    return {
      token: this.generateToken(user.id),
      user: user
    }
  }
}
