'use strict'

const mongo_host = process.env.MONGO_HOST || 'localhost'
const mongo_port = process.env.MONGO_PORT || 27017
const mongo_db_name = process.env.MONGO_DB_NAME || 'playground_db' 

// Note db not configured yet
module.exports = {
  name: 'PlaygroundAPI',
  version: '0.0.1',
  env: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 3000,
  base_url: process.env.BASE_URL || 'http://localhost:3000',
  db: {
    uri: `mongodb://${mongo_host}:${mongo_port}/${mongo_db_name}`,
    options: { useMongoClient: true, autoIndex: false }
  }
}
