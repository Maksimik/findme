'use strict'

import serviceBase from './serviceBase'

export default {

  /**
   * Gets all things.
   * @returns {*}
   */
  getAll: () => serviceBase.get('/things'),

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
