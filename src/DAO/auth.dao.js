import { UserModel } from '../database/schemas/user.schema.js'
import logger from '../logger.js'

class AuthDAO {
  async getUser(email) {
    try {
      logger.info('Getting user')
      return await UserModel.findOne({ email })
    } catch (error) {
      logger.error(`Error getting user: ${error.message}`)
      throw error
    }
  }

  async createUser(user) {
    try {
      logger.info('Creating user')
      return await UserModel.create(user)
    } catch (error) {
      logger.error(`Error creating user: ${error.message}`)
      throw error
    }
  }
}

export default new AuthDAO()
