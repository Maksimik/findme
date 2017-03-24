'use strict'

import dbBase from './dbBase'

/**
 * Thing db.
 */
export default {

  /**
   * Insert a user role.
   * @param {int} userId
   * @param {int} roleId
   * @return {Promise}
   */
  insert: (userId, roleId) => {
    const sql = `
      INSERT INTO user_roles
        (user_id, role_id)
      VALUES
        (:userId, :roleId)`

    const criteria = {
      userId: userId,
      roleId: roleId
    }

    return dbBase.insert(sql, criteria)
  }
}
