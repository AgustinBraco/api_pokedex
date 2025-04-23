import { UserModel } from '../database/schemas/user.schema.js'

class UserDAO {
  async getAll() {
    try {
      return await UserModel.find()
    } catch (error) {
      console.error('Error getting users:', error)
      throw error
    }
  }
}

export default new UserDAO()
