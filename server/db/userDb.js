'use strict'

import dbBase from './dbBase'
import {User} from '../models'

/**
 * User db.
 */
export default {

  /**
   * Gets a user by username.
   * @param {string} login
   * @return {Promise}
   */
  getByLogin: async login => {

    const sql = `
      SELECT
        id, first_name, last_name, login, password
      FROM users
      WHERE login = :login`

    const criteria = {login}
    const dbData = await dbBase.findOne(sql, criteria, null)

    return dbData === null ? null : new User(dbData)
  },

    /**
   * Gets user by id.
   * @param {int} id
   * @returns {null | User}
   */
  getById: async id => {
    const sql = `
      SELECT
        id, first_name, last_name, login, password
      FROM users
      WHERE id = :id`
    const criteria = {id}
    const dbData = await dbBase.findOne(sql, criteria, null)

    return dbData === null ? null : new User(dbData)
  },

  /**
   * Insert a user.
   * @param {Object} user
   * @return {Promise}
   */
  insert: async user => {
    const sql = `
      INSERT INTO users
        (first_name, last_name, login, password, created_at)
      VALUES
        (:firstName, :lastName, :login, :password, NOW())
      `

    const criteria = {
      firstName: user.firstName,
      lastName: user.lastName,
      login: user.login,
      password: user.password
    }

    return await dbBase.insert(sql, criteria)
  }
}
