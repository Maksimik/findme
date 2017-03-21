'use strict'

import Db from './db'
import config from '../config/environment'

const dbConfig = config.database.default || {}

export default new Db({
  host: dbConfig.host,
  database: dbConfig.database,
  user: dbConfig.userName,
  password: dbConfig.password
})
