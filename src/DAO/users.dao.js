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

  async getById(id) {
    try {
      return await UserModel.findById(id)
    } catch (error) {
      console.error('Error getting user:', error)
      throw error
    }
  }

  async getByEmail(email) {
    try {
      return await UserModel.findOne({ email })
    } catch (error) {
      console.error('Error getting user:', error)
      throw error
    }
  }

  async create(user) {
    try {
      return await UserModel.create(user)
    } catch (error) {
      console.error('Error creating user:', error)
      throw error
    }
  }

  async update(id, user) {
    try {
      return await UserModel.findByIdAndUpdate(
        id,
        { $set: user },
        { new: true, runValidators: true }
      )
    } catch (error) {
      console.error('Error updating user:', error)
      throw error
    }
  }

  async delete(id) {
    try {
      return await UserModel.findByIdAndDelete(id)
    } catch (error) {
      console.error('Error deleting user:', error)
      throw error
    }
  }

  async deleteAll() {
    try {
      return await UserModel.deleteMany({})
    } catch (error) {
      console.error('Error deleting users:', error)
      throw error
    }
  }
}

export default new UserDAO()
