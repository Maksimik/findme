'use strict'

import {thingLogic} from '../business'
import logger from '../core/logger'

import validate from '../../shared/validation/validate'
import validationRules from '../../shared/validation/Thing'
import {ValidationError, getResponseError} from '../errors'

/**
 * things controller.
 */
const thingsController = {

  /**
   * Load all things
   *
   * @param {object} req
   * @param {object} res
   * @param {function} res.json
   * @param {Function} [next]
   * @returns {*}
   */
  getAll(req, res, next) {
    logger.info('api/thingsController|getAll')

    thingLogic.getAll()
      .then(things => res.json({things: things}))
      .catch(err => {
        logger.error('api/thingsController|getAll', err)

        return next(err)
      })
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
  getById(req, res, next) {
    logger.info('api/thingsController|getById')

    return thingLogic.getById(req.params.id)
        .then(thing => res.json({thing: thing}))
        .catch(err => {
          logger.error('api/thingsController|getById', err)

          return next(err)
        })
  },

    /**
   * Load users thing by hash
   *
   * @param {object} req
   * @param {object} res
   * @param {function} res.json
   * @param {Function} [next]
   * @returns {*}
   */
  getByHash(req, res, next) {
    logger.info('api/thingsController|getByHash')

    return thingLogic.getByHash(req.params.hash)
      .then(thing => res.json({thing: thing}))
      .catch(err => {
          logger.error('api/thingsController|getByHash', err)

          return next(err)
      })
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
  add(req, res, next) {
    logger.info('api/thingsController|add')

    const errors = validate(req.body, validationRules)
    if (errors) {
      const responseError = getResponseError(new ValidationError('Bad request', errors))

      return res.status(responseError.error.code).json(responseError)
    }

    return thingLogic.add(req.body)
      .then(thing => res.json({thing}))
      .catch(err => {
        logger.error('api/thingsController|add', err)

        return next(err)
      })
  },

  /**
   * Delete thing
   *
   * @param {object} req
   * @param {object} res
   * @param {function} res.json
   * @param {Function} [next]
   * @returns {*}
   */
  delete(req, res, next) {
    logger.info('api/thingsController|delete')

    return thingLogic.delete(req.params.id)
      .then(affectedRows => res.json({affectedRows: affectedRows}))
      .catch(err => {
        logger.error('api/thingsController|delete', err)

        return next(err)
      })
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
  update(req, res, next) {
    logger.info('api/thingsController|update')

    const updateRequest = req.body
    if (updateRequest && !updateRequest.status && updateRequest.visible !== 'undefined') {
        return thingsController.updateVisible(req, res, next)
    }

    const errors = validate(req.body, validationRules)
    if (errors) {
      const responseError = getResponseError(new ValidationError('Bad request', errors))

      return res.status(responseError.error.code).json(responseError)
    }

    return thingLogic.update(req.params.id, req.body)
      .then(thing => res.json({thing}))
      .catch(err => {
        logger.error('api/thingsController|update', err)

        return next(err)
      })
  },

  /**
  * Update thing visible
  *
  * @param {object} req
  * @param {object} res
  * @param {function} res.json
  * @param {Function} [next]
  * @returns {*}
  */
  updateVisible(req, res, next) {
    logger.info('api/thingsController|update')

    return thingLogic.setIsVisible(req.params.id, req.body.visible)
      .then(() => res.json({
          id: req.params.id,
          isEnabled: req.body.visible
        })
      )
      .catch(err => {
        logger.log('error', 'thingsController|updateVisible|error:%o', err)

        return next(err)
      })
  }
}
export default thingsController
