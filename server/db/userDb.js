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
  getByLogin: login => {

    const sql = `
      SELECT
        id, first_name, last_name, login, password
      FROM users
      WHERE login = :login`

    const criteria = {login}

    return dbBase.findOne(sql, criteria, null)
      .then(dbData => {
        if (dbData === null) return null

          return new User(dbData)
      })
  },

    /**
   * Gets user by id.
   * @param {int} id
   * @returns {null | User}
   */
  getById: id => {
    const sql = `
      SELECT
        id, first_name, last_name, login, password
      FROM users
      WHERE id = :id`
    const criteria = {id}

    return dbBase.findOne(sql, criteria, null)
      .then(dbData => {
          if (dbData === null) return null

            return new User(dbData)
      })
  },

  /**
   * Insert a user.
   * @param {Object} user
   * @return {Promise}
   */
  insert: user => {
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

    return dbBase.insert(sql, criteria)
  }
}
