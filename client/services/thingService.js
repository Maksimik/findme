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
  getById: (id) => serviceBase.get(`/things/${id}`),

  /**
   * Add users thing.
   * @param {Object} req
   * @returns {*}
   */
  add: (req) => serviceBase.post(`/thing`, req),

  /**
   * Update users thing by id.
   * @param {number} id
   * @param {Object} req
   * @returns {*}
   */
  update: (id, req) => serviceBase.put(`/thing/${id}`, req)


}
