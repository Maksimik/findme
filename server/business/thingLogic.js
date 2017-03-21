'use strict'

import {thingDb, userThingsDb} from '../db'

const thingLogic = {

  /**
   * Gets all things
   * @returns {Array}
   */
  async getAll() {
    let things = []

    things = await thingDb.getAll()

    return things
  },

  /**
   * Gets users thing by id
   * @param {int} id
   * @returns {Array}
   */
  async getById(id) {
    const thing = await thingDb.getById(id)

    return thing
  },

  /**
   * Add thing
   * @param {Object} params
   * @returns {Array}
   */
  async add(params) {

    const data = this.getPreparedToSave(params)
    data.hash = 'hash'
    const thingId = await thingDb.insert(data)
    await userThingsDb.insert(params.userId, thingId)

    return {id: thingId}
  },

  /**
   * update users thing
   * @param {number} thingId
   * @param {Object} params
   * @returns {Array}
   */
  async update(thingId, params) {

    const data = this.getPreparedToSave(params)
    await thingDb.update(thingId, data)

    return {id: thingId}
  },

  getPreparedToSave(thing) {
    return {
      title: thing.title,
      status: thing.status,
      description: thing.description,
      visible: thing.visible
    }
  }
}

export default thingLogic
