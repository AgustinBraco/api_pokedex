import sqlite3 from 'sqlite3'
import logger from '../logger/logger.js'

sqlite3.verbose()

// Create database
const database = new sqlite3.Database(':memory:', error => {
  if (error) return logger.error(`Error creating database: ${error.message}`)

  logger.info('Database created successfully')

  // Pokedex
  database.run(
    `CREATE TABLE pokedex (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL UNIQUE,
    image TEXT NOT NULL,
    types TEXT NOT NULL,
    category TEXT NOT NULL,
    generation TEXT NOT NULL,
    height REAL NOT NULL,
    weight REAL NOT NULL,
    stats TEXT NOT NULL,
    level INTEGER NOT NULL
  )`,
    error => {
      if (error)
        return logger.error(`Error creating table "pokedex": ${error.message}`)

      logger.info('Table "pokedex" created')
    }
  )

  // Users
  database.run(
    `CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    birthday TEXT NOT NULL,
    gender TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    role TEXT NOT NULL
  )`,
    error => {
      if (error)
        return logger.error(`Error creating table "users": ${error.message}`)

      logger.info('Table "users" created')
    }
  )
})

export default database
