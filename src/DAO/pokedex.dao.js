import database from '../database/database.js'
import logger from '../logger/logger.js'

class PokedexDAO {
  getAll() {
    try {
      logger.info('Getting all Pokemon')

      const search = 'SELECT * FROM pokedex'

      return new Promise((resolve, reject) => {
        database.all(search, [], (error, pokemon) => {
          if (error) {
            logger.error(`Error searching Pokemon ${error}`)
            return reject(new Error(error))
          }

          logger.info(`Pokemon retrieved successfully`)
          return resolve(pokemon)
        })
      })
    } catch (error) {
      logger.error(`Error getting all Pokemon: ${error}`)
      throw error
    }
  }

  get(name) {
    try {
      logger.info('Getting Pokemon')

      const search = 'SELECT * FROM pokedex WHERE name = ?'

      return new Promise((resolve, reject) =>
        database.get(search, [name], (error, pokemon) => {
          if (error) {
            logger.error(`Error searching Pokemon ${error}`)
            return reject(new Error(error))
          }

          if (!pokemon) {
            logger.warn(`Pokemon not found in database`)
            return resolve(pokemon)
          }

          logger.info(`Pokemon retrieved successfully`)
          return resolve(pokemon)
        })
      )
    } catch (error) {
      logger.error(`Error getting Pokemon: ${error}`)
      throw error
    }
  }

  create(pokemon) {
    try {
      logger.info('Creating Pokemon')

      const {
        name,
        image,
        types,
        category,
        generation,
        height,
        weight,
        stats,
        level
      } = pokemon

      const insert = `INSERT INTO pokedex (name, image, types, category, generation, height, weight, stats, level) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`

      return new Promise((resolve, reject) => {
        database.run(
          insert,
          [
            name,
            image,
            types,
            category,
            generation,
            height,
            weight,
            stats,
            level
          ],
          function (error) {
            if (error) {
              logger.error(`Error creating Pokemon ${error}`)
              return reject(new Error(error))
            }

            logger.info(`Pokemon created successfully`)
            return resolve()
          }
        )
      })
    } catch (error) {
      logger.error(`Error creating Pokemon: ${error}`)
      throw error
    }
  }

  upgrade(name) {
    try {
      logger.info('Updating Pokemon')

      const update =
        'UPDATE pokedex SET level = level + 1 WHERE name = ? AND level < 100'

      return new Promise((resolve, reject) =>
        database.run(update, [name], function (error) {
          if (error) {
            logger.error(`Error updating Pokemon: ${error}`)
            return reject(new Error(error))
          }

          if (this.changes === 0) {
            logger.warn('Pokemon is already at max level (100)')
            return resolve({ maxLevel: true })
          }

          logger.info('Pokemon updated successfully')
          resolve({ maxLevel: false })
        })
      )
    } catch (error) {
      logger.error(`Error updating Pokemon: ${error}`)
      throw error
    }
  }

  delete(name) {
    try {
      logger.info('Deleting Pokemon')

      const query = `DELETE FROM pokedex WHERE name = ?`

      return new Promise((resolve, reject) => {
        database.run(query, [name], function (error) {
          if (error) {
            logger.error(`Error deleting Pokemon ${error}`)
            return reject(new Error(error))
          }

          logger.info(`Pokemon deleted successfully`)
          return resolve()
        })
      })
    } catch (error) {
      logger.error(`Error deleting Pokemon: ${error}`)
      throw error
    }
  }

  deleteAll() {
    try {
      logger.info('Deleting all Pokemon')

      const query = `DELETE FROM pokedex`

      return new Promise((resolve, reject) => {
        database.run(query, [], function (error) {
          if (error) {
            logger.error(`Error deleting Pokemon ${error}`)
            return reject(new Error(error))
          }

          logger.info(`Pokemon deleted successfully`)
          return resolve()
        })
      })
    } catch (error) {
      logger.error(`Error deleting Pokemon: ${error}`)
      throw error
    }
  }
}

export default new PokedexDAO()
