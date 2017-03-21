'use strict'

/**
 * Thing model.
 * @param {Object} dbData
 * @param {int} dbData.id
 * @param {String} dbData.hash
 * @param {String} dbData.title
 * @param {String} dbData.description
 * @param {int} dbData.visible
 * @param {String} dbData.status
 */
class Thing {

  constructor(dbData) {
    this.id = dbData.id
    this.hash = dbData.hash
    this.title = dbData.title
    this.description = dbData.description
    this.visible = dbData.visible
    this.status = dbData.status
    // this.createdAt = dbData.created_at
    // this.updateAt = dbData.update_at
  }
}

export default Thing
