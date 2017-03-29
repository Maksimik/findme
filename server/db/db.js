'use strict'

import mysql from 'mysql2/promise'
import logger from '../core/logger'

class Db {
  constructor(config) {
    this.setPool(config)
  }

  setPool(config) {
    this.pool = mysql.createPool({
      host: config.host,
      database: config.database,
      user: config.user,
      password: config.password,
      dateStrings: true,
      namedPlaceholders: true,
      supportBigNumbers: true
    })
  }

  closeConnection(conn) {
    if (!conn) return

    try {
      conn.release()
    } catch (error) {
      logger.error('db|closeConnection', {error})
    }
  }


  findAll(sql, criterial, defaultResult) {
    let connection = null

    return this.pool.getConnection()
      .then(conn => {
        connection = conn
        const data = conn.execute(sql, criterial)
        this.closeConnection(conn)

        return data
      })
      .then(data => data[0])
      .catch(err => {
        logger.error('db|findAll', {err, sql, criterial})
        this.closeConnection(connection)

        return defaultResult
      })
  }

  findOne(sql, criterial, defaultResult) {
    let connection = null

    return this.pool.getConnection()
      .then(conn => {
        connection = conn

        const rows = conn.execute(sql, criterial)

        this.closeConnection(conn)

        return rows
      })
      .then(rows => {
        if (rows.length > 0 && typeof rows[0][0] !== 'undefined') return rows[0][0]

        return defaultResult
      })
      .catch(err => {
        logger.log('error', 'db|findOne', {sql, criterial, err})
        this.closeConnection(connection)

        return defaultResult
      })
  }

  /**
   * Executes UPDATE query.
   * @param {string} sql
   * @param {Object} criterial
   * @returns {int} - number of updated records.
   */
   update(sql, criterial) {
    let connection = null

    return this.pool.getConnection()
      .then(conn => {
        connection = conn
        const result = conn.query(sql, criterial)

        this.closeConnection(conn)

        return result
      })
      .then(result => result[0].affectedRows)
      .catch(err => {
        logger.log('error', 'db|update', {sql, criterial, err})
        this.closeConnection(connection)
        throw err
      })
  }

  insert(sql, criterial) {
    let connection = null

    return this.pool.getConnection()
      .then(conn => {
        connection = conn

        return conn.query(sql, criterial)
      })
      .then(result => {
        this.closeConnection(connection)

        return result[0].insertId
      })
      .catch(err => {
        logger.log('error', 'db|insert', {sql, criterial, err})
        this.closeConnection(connection)
        throw err
      })
  }

  delete(sql, criterial) {
    let connection = null

     return this.pool.getConnection()
      .then(conn => {
        connection = conn

        return conn.execute(sql, criterial)
      })
      .then(result => result[0].affectedRows)
      .catch(err => {
        logger.log('error', 'db|delete', {sql, criterial, err})
        this.closeConnection(connection)
        throw err
      })
  }
}

export default Db
