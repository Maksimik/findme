'use strict'

/**
 * UserProfile model.
 * @param {Object} dbData
 * @param {String} dbData.type
 * @param {String} dbData.value
 * @param {int} dbData.visible
 */
class UserProfile {

  constructor(dbData) {
    this.type = dbData.type
    this.value = dbData.value
    this.visible = dbData.visible
  }
}

export default UserProfile
