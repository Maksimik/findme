'use strict'

import {thingLogic} from '../business'
import logger from '../core/logger'

import validate from '../../shared/validation/validate'
import validationRules from '../../shared/validation/Thing'
import {ValidationError, getResponseError} from '../errors'

/**
 * things controller.
 */
export default {

  /**
   * Load all things
   *
   * @param {object} req
   * @param {object} res
   * @param {function} res.json
   * @param {Function} [next]
   * @returns {*}
   */
  async getAll(req, res, next) {
    logger.info('api/thingsController|getAll')

    try {
      const things = await thingLogic.getAll()

      return res.json({things: things})
    } catch (e) {
      logger.error('api/thingsController|getAll', e)

      return next(e)
    }
  },

  /**
   * Load users thing by id
   *
   * @param {object} req
   * @param {object} res
   * @param {function} res.json
   * @param {Function} [next]
   * @returns {*}
   */
  async getById(req, res, next) {
    logger.info('api/thingsController|getById')

    try {
      const thing = await thingLogic.getById(req.params.id)

      return res.json({thing: thing})
    } catch (e) {
      logger.error('api/thingsController|getById', e)

      return next(e)
    }
  },

  /**
   * Add users thing
   *
   * @param {object} req
   * @param {object} res
   * @param {function} res.json
   * @param {Function} [next]
   * @returns {*}
   */
  async add(req, res, next) {
    logger.info('api/thingsController|add')

    try {
      const errors = validate(req.body, validationRules)
      if (errors) {
        const responseError = getResponseError(new ValidationError('Bad request', errors))

        return res.status(responseError.error.code).json(responseError)
      }

      const thing = await thingLogic.add(req.body)

      return res.json({thing})
    } catch (e) {
      logger.error('api/thingsController|add', e)

      return next(e)
    }
  },

  /**
   * Update users thing
   *
   * @param {object} req
   * @param {object} res
   * @param {function} res.json
   * @param {Function} [next]
   * @returns {*}
   */
  async update(req, res, next) {
    logger.info('api/thingsController|update')

    try {
      const errors = validate(req.body, validationRules)
      if (errors) {
        const responseError = getResponseError(new ValidationError('Bad request', errors))

        return res.status(responseError.error.code).json(responseError)
      }

      const thing = await thingLogic.update(req.params.id, req.body)

      return res.json({thing})
    } catch (e) {
      logger.error('api/thingsController|update', e)

      return next(e)
    }
  }
}
