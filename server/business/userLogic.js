'use strict'

import {userProfilesDb, userThingsDb} from '../db'

const userLogic = {

  /**
   * Gets user profile
   * @param {int} userId
   * @returns {Array}
   */
  get(userId) {

    return userProfilesDb.get(userId)
  },

  /**
   * Gets user profile
   * @param {int} thingId
   * @returns {Array}
   */
  getUserProfileById(thingId) {

    return userThingsDb.getUserId(thingId)
      .then(data => userProfilesDb.getUserProfileById(data.user_id))
  },

  /**
   * update user profile
   * @param {number} userId
   * @param {Object} params
   * @returns {Array}
   */
  update(userId, params) {

    return userProfilesDb.delete(userId)
      .then(() => params.map(x => userProfilesDb.insert(userId, x)))
  }
}

export default userLogic
