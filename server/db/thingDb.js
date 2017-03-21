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
  getAll: async () => {
    const sql = `
      SELECT
        id, hash, title, description, visible, status
      FROM things
      ORDER BY title ASC`

    const dbData = await dbBase.findAll(sql)

    return dbData.map(x => new Thing(x))
  },

  /**
   * Gets a thing by id.
   * @param {int} id
   * @return {Promise}
   */
  getById: async id => {
    const sql = `
      SELECT
        id, hash, title, description, visible, status
      FROM things
      WHERE id = :id`

    const criteria = {id}
    const dbData = await dbBase.findOne(sql, criteria, null)

    return dbData === null ? null : new Thing(dbData)
  },

  /**
   * Insert a thing.
   * @param {Object} thing
   * @return {Promise}
   */
  insert: async thing => {
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

    return await dbBase.insert(sql, criteria)
  },

  /**
   * Update a things.
   * @param {number} id
   * @param {Object} thing
   * @return {Promise}
   */
  update: async (id, thing) => {
    const sql = `
      UPDATE things
      SET
        title = :title,
        description = :description,
        status = :status,
        visible = :visible,
        update_at = :NOW()
      WHERE id = :id`

    const criteria = {
      id: id,
      status: thing.status,
      title: thing.title,
      description: thing.description,
      visible: thing.visible
    }

    return await dbBase.update(sql, criteria)
  }
}
