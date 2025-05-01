import { UserModel } from '../database/schemas/user.schema.js'
import logger from '../logger.js'

class UserDAO {
  async getAll() {
    try {
      logger.info('Getting users')
      return await UserModel.find()
    } catch (error) {
      logger.error(`Error getting users: ${error}`)
      throw error
    }
  }

  async getById(id) {
    try {
      logger.info('Getting user')
      return await UserModel.findById(id)
    } catch (error) {
      logger.error(`Error getting user: ${error}`)
      throw error
    }
  }

  async getByEmail(email) {
    try {
      logger.info('Getting user')
      return await UserModel.findOne({ email })
    } catch (error) {
      logger.error(`Error getting user: ${error}`)
      throw error
    }
  }

  async create(user) {
    try {
      logger.info('Creating user')
      return await UserModel.create(user)
    } catch (error) {
      logger.error(`Error creating user: ${error}`)
      throw error
    }
  }

  async update(id, user) {
    try {
      logger.info('Updating user')
      return await UserModel.findByIdAndUpdate(
        id,
        { $set: user },
        { new: true, runValidators: true }
      )
    } catch (error) {
      logger.error(`Error updating user: ${error}`)
      throw error
    }
  }

  async delete(id) {
    try {
      logger.info('Deleting user')
      return await UserModel.findByIdAndDelete(id)
    } catch (error) {
      logger.error(`Error deleting user: ${error}`)
      throw error
    }
  }

  async deleteAll() {
    try {
      logger.info('Deleting users')
      return await UserModel.deleteMany({})
    } catch (error) {
      logger.error(`Error deleting users: ${error}`)
      throw error
    }
  }
}

export default new UserDAO()
