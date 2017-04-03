'use strict'

import dbBase from './dbBase'

/**
 * Thing db.
 */
export default {

  /**
   * Insert a thing.
   * @param {int} userId
   * @param {int} thingId
   * @return {Promise}
   */
  insert: (userId, thingId) => {
    const sql = `
      INSERT INTO user_things
        (thing_id, user_id)
      VALUES
        (:thingId, :userId)`

    const criteria = {
      userId: userId,
      thingId: thingId
    }

    return dbBase.insert(sql, criteria)
  },

  /**
   * Get userId by thingId.
   * @param {int} thingId
   * @return {Promise}
   */
  getUserId: (thingId) => {
    const sql = `
      SELECT
        user_id
      FROM user_things
      WHERE thing_id = :thingId`

    const criteria = {
      thingId: thingId
    }

    return dbBase.findOne(sql, criteria)
  },

  /**
   * Delete thing.
   * @param {int} thingId
   * @return {Promise}
   */
  delete: thingId => {
    const sql = `
      DELETE FROM
        user_things
      WHERE thing_id = :thingId`

    const criteria = {thingId}

    return dbBase.delete(sql, criteria)
  }
}
