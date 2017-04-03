'use strict'

import {userLogic} from '../business'
import logger from '../core/logger'

/**
 * users controller.
 */
const usersController = {

  /**
   * Load user profiles
   *
   * @param {object} req
   * @param {object} res
   * @param {function} res.json
   * @param {Function} [next]
   * @returns {*}
   */
  get(req, res, next) {
    logger.info('api/usersController|get')

    userLogic.get(req.params.id)
      .then(data => res.json(data))
      .catch(err => {
        logger.error('api/usersController|get', err)

        return next(err)
      })
  },

  /**
   * Load user profiles
   *
   * @param {object} req
   * @param {object} res
   * @param {function} res.json
   * @param {Function} [next]
   * @returns {*}
   */
  getUserProfileById(req, res, next) {
    logger.info('api/usersController|getUserProfileById')

    userLogic.getUserProfileById(req.params.id)
      .then(data => res.json(data))
      .catch(err => {
        logger.error('api/usersController|getUserProfileById', err)

        return next(err)
      })
  },

  /**
   * Update user profile
   *
   * @param {object} req
   * @param {object} res
   * @param {function} res.json
   * @param {Function} [next]
   * @returns {*}
   */
  update(req, res, next) {
    logger.info('api/usersController|update')

    return userLogic.update(req.params.id, req.body)
      .then(data => res.json({data}))
      .catch(err => {
        logger.error('api/usersController|update', err)

        return next(err)
      })
  }
}
export default usersController
