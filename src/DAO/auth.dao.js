import database from '../database/database.js'
import logger from '../logger/logger.js'

class AuthDAO {
  async getUser(email) {
    try {
      logger.info('Getting user')

      const search = 'SELECT * FROM users WHERE email = ?'

      return new Promise((resolve, reject) =>
        database.get(search, [email], (error, user) => {
          if (error) {
            logger.error(`Error searching user ${error}`)
            return reject(new Error(error))
          }

          if (!user) {
            logger.warn(`User not found in database`)
            return resolve(user)
          }

          logger.info(`User retrieved successfully`)
          return resolve(user)
        })
      )
    } catch (error) {
      logger.error(`Error getting user: ${error.message}`)
      throw error
    }
  }

  async createUser(user) {
    try {
      logger.info('Creating user')

      const { first_name, last_name, birthday, gender, email, password, role } =
        user

      const insert = `INSERT INTO users (first_name, last_name, birthday, gender, email, password, role) VALUES (?, ?, ?, ?, ?, ?, ?)`

      return new Promise((resolve, reject) => {
        database.run(
          insert,
          [first_name, last_name, birthday, gender, email, password, role],
          function (error) {
            if (error) {
              logger.error(`Error creating user ${error}`)
              return reject(new Error(error))
            }

            logger.info(`User created successfully`)
            return resolve()
          }
        )
      })
    } catch (error) {
      logger.error(`Error creating user: ${error.message}`)
      throw error
    }
  }
}

export default new AuthDAO()
