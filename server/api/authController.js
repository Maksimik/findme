'use strict'

import {authLogic} from '../business'
import logger from '../core/logger'
import validate from '../../shared/validation/validate'
import validationRules from '../../shared/validation/SignUp'
import {ValidationError, getResponseError} from '../errors'

/**
 * Authentication controller.
 */
const authController = {

    /**
   * Sign in
   * @param {object} req
   * @param {object} res
   * @param {function} res.json
   * @param {function} res.status
   * @param {object} res.body
   * @param {string} [res.body.login]
   * @param {string} [res.body.password]
   * @param {Function} [next]
   * @returns {*}
   */
  async signIn(req, res, next) {
    logger.info('api/authController|signIn', {login: req.body.login})
    try {
      const response = await authLogic.signIn(req.body.login, req.body.password)

      return res.json(response)
    } catch (e) {
      return next(e)
    }
  },

  /**
   * Sign up
   *
   * @param {object} req
   * @param {object} res
   * @param {function} res.json
   * @param {Function} [next]
   * @returns {*}
   */
  async signUp(req, res, next) {
    logger.info('api/authController|signUp')

    try {
      const errors = validate(req.body, validationRules)
      if (errors) {
        const responseError = getResponseError(new ValidationError('Bad request', errors))

        return res.status(responseError.error.code).json(responseError)
      }

      const response = await authLogic.signUp(req.body)

      return res.json(response)

    } catch (e) {
      logger.error('api/authController|signUp', e)

      return next(e)
    }
  }

}
export default authController
