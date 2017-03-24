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
  }
}
