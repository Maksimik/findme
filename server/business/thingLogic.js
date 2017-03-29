'use strict'

import {thingDb, userThingsDb} from '../db'
import uuid from 'uuid-v4'

const thingLogic = {

  /**
   * Gets all user things
   * @param {int} userId
   * @returns {Array}
   */
  getAll(userId) {

    return thingDb.getAll(userId)
  },

  /**
   * Gets users thing by id
   * @param {int} id
   * @returns {Array}
   */
  getById(id) {

    return thingDb.getById(id)
  },

  /**
   * Gets users thing by hash
   * @param {string} hash
   * @returns {Array}
   */
  getByHash(hash) {

    return thingDb.getByHash(hash)
      .then(thing => {
        if (thing.visible === 0) return null

        return thing
      })
  },

  /**
   * Add thing
   * @param {Object} params
   * @returns {Array}
   */
  add(params) {

    const data = this.getPreparedToSave(params)

    return this.getHash()
      .then(hash => {

        data.hash = hash

        return thingDb.insert(data)
          .then(thingId =>
             userThingsDb.insert(params.userId, thingId)
              .then(() => ({id: thingId}))
            )
      })
  },

  /**
   * update users thing
   * @param {number} thingId
   * @param {Object} params
   * @returns {Array}
   */
  update(thingId, params) {

    const data = this.getPreparedToSave(params)

    return thingDb.update(thingId, data)
  },

  /**
   * Delete thing
   * @param {number} thingId
   * @returns {Array}
   */
  delete(thingId) {
    return userThingsDb.delete(thingId)
      .then(() => thingDb.delete(thingId))

    // return thingDb.delete(thingId)
  },

  /**
   * update thing visible
   * @param {number} id
   * @param {boolean} isVisible
   * @returns {Array}
   */
  setIsVisible(id, isVisible) {

    return thingDb.updateIsVisibled(id, isVisible)
  },

  getPreparedToSave(thing) {

    return {
      title: thing.title,
      status: thing.status,
      description: thing.description,
      visible: thing.visible
    }
  },

  getHash() {
    const hash = uuid()

    return thingDb.getByHash(hash)
      .then(thing => {

        if (thing) this.getHash()

        return hash
      })
  }
}

export default thingLogic
