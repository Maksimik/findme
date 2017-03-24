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
  signIn(req, res, next) {
    logger.info('api/authController|signIn', {login: req.body.login})

    return authLogic.signIn(req.body.login, req.body.password)
      .then(response => res.json(response))
      .catch(e => next(e))
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
  signUp(req, res, next) {
    logger.info('api/authController|signUp')

    try {
      const errors = validate(req.body, validationRules)
      if (errors) {
        const responseError = getResponseError(new ValidationError('Bad request', errors))

        return res.status(responseError.error.code).json(responseError)
      }

      return authLogic.signUp(req.body)
        .then(response => res.json(response))
        .catch(err => {
          logger.error('api/authController|signUp', err)

          return next(err)
        })

    } catch (err) {
      logger.error('api/authController|signUp', err)

      return next(err)
    }
  }

}
export default authController
