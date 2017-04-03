'use strict'

import serviceBase from './serviceBase'

export default {

  /**
   * Gets user profile.
   * @param {number} id
   * @returns {*}
   */
  get: (id) => serviceBase.get(`/user/${id}`),

  /**
   * Gets user profile by id.
   * @param {string} id
   * @returns {*}
   */
  getUserProfileById: (id) => serviceBase.get(`/preview/userProfile/${id}`),

  /**
   * Update user profile by id.
   * @param {number} id
   * @param {Object} req
   * @returns {*}
   */
  update: (id, req) => serviceBase.put(`/user/update/${id}`, req)

}
