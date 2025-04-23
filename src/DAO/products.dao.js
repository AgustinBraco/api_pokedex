import { ProductModel } from '../database/schemas/product.schema.js'

class ProductDAO {
  async getAll() {
    try {
      return await ProductModel.find()
    } catch (error) {
      console.error('Error getting products:', error)
      throw error
    }
  }
}

export default new ProductDAO()
