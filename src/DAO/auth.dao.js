import { UserModel } from '../database/schemas/user.schema.js'

class AuthDAO {
  async getUser(email) {
    try {
      return await UserModel.findOne({ email })
    } catch (error) {
      console.error('Error getting user:', error)
      throw error
    }
  }

  async createUser(user) {
    try {
      return await UserModel.create(user)
    } catch (error) {
      console.error('Error creating user:', error)
      throw error
    }
  }
}

export default new AuthDAO()