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

  async getById(id) {
    try {
      return await ProductModel.findById(id)
    } catch (error) {
      console.error('Error getting product:', error)
      throw error
    }
  }

  async create(product) {
    try {
      return await ProductModel.create(product)
    } catch (error) {
      console.error('Error creating product:', error)
      throw error
    }
  }

  async update(id, product) {
    try {
      return await ProductModel.findByIdAndUpdate(
        id,
        { $set: product },
        { new: true, runValidators: true }
      )
    } catch (error) {
      console.error('Error updating product:', error)
      throw error
    }
  }

  async delete(id) {
    try {
      return await ProductModel.findByIdAndDelete(id)
    } catch (error) {
      console.error('Error deleting product:', error)
      throw error
    }
  }

  async deleteAll() {
    try {
      return await ProductModel.deleteMany({})
    } catch (error) {
      console.error('Error deleting products:', error)
      throw error
    }
  }
}

export default new ProductDAO()
