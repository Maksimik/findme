'use strict'

import serviceBase from './serviceBase'

export default {

  /**
   * Gets all things.
   * @param {number} userId
   * @returns {*}
   */
  getAll: (userId) => serviceBase.get(`/things/${userId}`),

  /**
   * Gets thing by id.
   * @param {number} id
   * @returns {*}
   */
  getById: (id) => serviceBase.get(`/thing/${id}`),

   /**
   * Gets thing by hash.
   * @param {string} hash
   * @returns {*}
   */
  getByHash: (hash) => serviceBase.get(`/preview/${hash}`),

  /**
   * Gets thing image by hash.
   * @param {string} hash
   * @returns {*}
   */
  // getImage: (hash) => serviceBase.get(`/thing/qr-image/${hash}`),

  /**
   * Add users thing.
   * @param {Object} req
   * @returns {*}
   */
  add: (req) => serviceBase.post(`/thing/add`, req),

  /**
   * Update users thing by id.
   * @param {number} id
   * @param {Object} req
   * @returns {*}
   */
  update: (id, req) => serviceBase.put(`/thing/update/${id}`, req),

  /**
   * Delete thing by id.
   * @param {number} id
   * @returns {*}
   */
  delete: (id) => serviceBase.delete(`/thing/delete/${id}`)

}
