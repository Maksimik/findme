'use strict'

import dbBase from './dbBase'
import {Thing} from '../models'

/**
 * Thing db.
 */
export default {

  /**
   * Gets all things.
   * @return {Promise}
   */
  getAll: () => {
    const sql = `
      SELECT
        id, hash, title, description, visible, status
      FROM things
      ORDER BY title ASC`

    return dbBase.findAll(sql)
      .then(dbData => dbData.map(x => new Thing(x)))
  },

  /**
   * Gets a thing by id.
   * @param {int} id
   * @return {Promise}
   */
  getById: id => {
    const sql = `
      SELECT
        id, hash, title, description, visible, status
      FROM things
      WHERE id = :id`

    const criteria = {id}

    return dbBase.findOne(sql, criteria, null)
      .then(dbData => {
        if (dbData === null) return null

          return new Thing(dbData)
      })
  },

   /**
   * Gets a thing by hash.
   * @param {string} hash
   * @return {Promise}
   */
  getByHash: hash => {
    const sql = `
      SELECT
        id, hash, title, description, visible, status
      FROM things
      WHERE hash = :hash`

    const criteria = {hash}

    return dbBase.findOne(sql, criteria, null)
    .then(dbData => {
        if (typeof dbData === 'undefined' || dbData === null) return null

          return new Thing(dbData)
    })
  },

  /**
   * Insert a thing.
   * @param {Object} thing
   * @return {Promise}
   */
  insert: thing => {
    const sql = `
      INSERT INTO things
        (hash, title, description, visible, status, created_at)
      VALUES
        (:hash, :title, :description, :visible, :status, NOW())`

    const criteria = {
      hash: thing.hash,
      status: thing.status,
      title: thing.title,
      description: thing.description,
      visible: thing.visible
    }

    return dbBase.insert(sql, criteria)
  },

  /**
   * Update a things.
   * @param {number} id
   * @param {Object} thing
   * @return {Promise}
   */
  update: (id, thing) => {
    const sql = `
      UPDATE things
      SET
        title = :title,
        description = :description,
        status = :status,
        visible = :visible,
        updated_at = NOW()
      WHERE id = :id`

    const criteria = {
      id: id,
      status: thing.status,
      title: thing.title,
      description: thing.description,
      visible: thing.visible
    }

    return dbBase.update(sql, criteria)
  },

  /**
   * Delete thing.
   * @param {int} id
   * @return {Promise}
   */
  delete: id => {
    const sql = `
      DELETE FROM
        things
      WHERE id = :id`

    const criteria = {id}

    return dbBase.delete(sql, criteria)
  },

  /**
   * Update thing visible.
   * @param {int} id
   * @param {bool} isVisible
   * @return {Promise}
   */
  updateIsVisibled: (id, isVisible) => {
    const sql = `
      UPDATE
        things
      SET
        visible = :isVisible
      WHERE id = :id`

    const criteria = {id, isVisible: Boolean(isVisible)}

    return dbBase.update(sql, criteria)
  }
}
