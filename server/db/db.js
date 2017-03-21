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

  async findAll(sql, criteria, defaultResult) {
    let conn = null
    try {
      conn = await this.pool.getConnection()
      const [rows] = await conn.execute(sql, criteria)

      return rows
    } catch (err) {
      logger.error('db|findAll', {err, sql, criteria})

      return defaultResult
    } finally {
      this.closeConnection(conn)
    }
  }

  async findOne(sql, criteria, defaultResult) {
    let conn = null
    try {
      conn = await this.pool.getConnection()
      const [rows] = await conn.execute(sql, criteria)

      return rows.length > 0 ? rows[0] : defaultResult
    } catch (err) {
      logger.log('error', 'db|findOne', {sql, criteria, err})

      return defaultResult
    } finally {
      this.closeConnection(conn)
    }
  }

  /**
   * Executes UPDATE query.
   * @param {string} sql
   * @param {Object} criteria
   * @returns {int} - number of updated records.
   */
  async update(sql, criteria) {
    let conn = null
    try {
      conn = await this.pool.getConnection()
      const result = await conn.query(sql, criteria)

      return result[0].affectedRows
    } catch (err) {
      logger.log('error', 'db|update', {sql, criteria, err})
      throw err
    } finally {
      this.closeConnection(conn)
    }
  }

  async insert(sql, criteria) {
    let conn = null
    try {
      conn = await this.pool.getConnection()
      const result = await conn.query(sql, criteria)

      return result[0].insertId
    } catch (err) {
      logger.log('error', 'db|insert', {sql, criteria, err})
      throw err
    } finally {
      this.closeConnection(conn)
    }
  }

  async delete(sql, criteria) {
    let conn = null
    try {
      conn = await this.pool.getConnection()
      const result = await conn.query(sql, criteria)

      return result[0].affectedRows
    } catch (err) {
      logger.log('error', 'db|delete', {sql, criteria, err})

      throw err
    } finally {
      this.closeConnection(conn)
    }
  }
}

export default Db
