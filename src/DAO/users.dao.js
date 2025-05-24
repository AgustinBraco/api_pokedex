import database from '../database/database.js'
import logger from '../logger/logger.js'

class UserDAO {
  async getAll() {
    try {
      logger.info('Getting users')

      const search = 'SELECT * FROM users'

      return new Promise((resolve, reject) =>
        database.all(search, [], (error, users) => {
          if (error) {
            logger.error(`Error getting users ${error}`)
            return reject(new Error(error))
          }

          logger.info(`Users retrieved successfully`)
          return resolve(users)
        })
      )
    } catch (error) {
      logger.error(`Error getting users: ${error}`)
      throw error
    }
  }

  async getByID(id) {
    try {
      logger.info('Getting user')

      const search = 'SELECT * FROM users WHERE id = ?'

      return new Promise((resolve, reject) =>
        database.get(search, [id], (error, user) => {
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
      logger.error(`Error getting user: ${error}`)
      throw error
    }
  }

  async getByEmail(email) {
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
      logger.error(`Error getting user: ${error}`)
      throw error
    }
  }

  async create(user) {
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
      logger.error(`Error creating user: ${error}`)
      throw error
    }
  }

  async update(id, user) {
    try {
      logger.info('Updating user')

      const { first_name, last_name, birthday, gender, email, password, role } =
        user

      const update =
        'UPDATE users SET first_name = ?, last_name = ?, birthday = ?, gender = ?, email = ?, password = ?, role = ? WHERE id = ?'

      return new Promise((resolve, reject) =>
        database.run(
          update,
          [first_name, last_name, birthday, gender, email, password, role, id],
          function (error) {
            if (error) {
              logger.error(`Error updating User: ${error}`)
              return reject(new Error(error))
            }

            logger.info('User updated successfully')
            resolve()
          }
        )
      )
    } catch (error) {
      logger.error(`Error updating user: ${error}`)
      throw error
    }
  }

  async delete(id) {
    try {
      logger.info('Deleting user')

      const query = `DELETE FROM users WHERE id = ?`

      return new Promise((resolve, reject) => {
        database.run(query, [id], function (error) {
          if (error) {
            logger.error(`Error deleting User ${error}`)
            return reject(new Error(error))
          }

          logger.info(`User deleted successfully`)
          return resolve()
        })
      })
    } catch (error) {
      logger.error(`Error deleting user: ${error}`)
      throw error
    }
  }

  async deleteAll() {
    try {
      logger.info('Deleting users')

      const query = `DELETE FROM users`

      return new Promise((resolve, reject) => {
        database.run(query, [], function (error) {
          if (error) {
            logger.error(`Error deleting User ${error}`)
            return reject(new Error(error))
          }

          logger.info(`User deleted successfully`)
          return resolve()
        })
      })
    } catch (error) {
      logger.error(`Error deleting users: ${error}`)
      throw error
    }
  }
}

export default new UserDAO()
