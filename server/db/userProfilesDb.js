'use strict'

import dbBase from './dbBase'
import {UserProfile} from '../models'

/**
 * User db.
 */
export default {

  /**
   * Gets user by userId.
   * @param {int} userId
   * @returns {null | UserProfile}
   */
  get: userId => {
    const sql = `
      SELECT
        type, value, visible
      FROM user_profiles
      WHERE user_id = :userId`
    const criteria = {userId}

    return dbBase.findAll(sql, criteria, null)
      .then(dbData => dbData.map(x => new UserProfile(x)))
  },

  /**
   * Gets user by userId.
   * @param {int} userId
   * @returns {null | UserProfile}
   */
  getUserProfileById: userId => {
    const sql = `
      SELECT
        type, value, visible
      FROM user_profiles
      WHERE user_id = :userId AND visible = 1`
    const criteria = {userId}

    return dbBase.findAll(sql, criteria, null)
      .then(dbData => dbData.map(x => new UserProfile(x)))
  },

  /**
   * Insert user profile.
   * @param {int} userId
   * @param {Object} data
   * @return {Promise}
   */
  insert: (userId, data) => {
    const sql = `
      INSERT INTO user_profiles
        (user_id, type, value, visible)
      VALUES
        (:userId, :type, :value, :visible)
      `
    const criteria = {
      userId: userId,
      type: data.type,
      value: data.value,
      visible: Number(data.visible)
    }

    return dbBase.insert(sql, criteria)
  },

  /**
   * Delete user profile.
   * @param {int} userId
   * @return {Promise}
   */
  delete: userId => {
    const sql = `
      DELETE FROM
        user_profiles
      WHERE user_id = :userId`

    const criteria = {userId}

    return dbBase.delete(sql, criteria)
  }
}
