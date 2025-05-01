import { ProductModel } from '../database/schemas/product.schema.js'
import logger from '../logger.js'

class ProductDAO {
  async getAll() {
    try {
      logger.info(`Getting products`)
      return await ProductModel.find()
    } catch (error) {
      logger.error(`Error getting products: ${error.message}`)
      throw error
    }
  }

  async getById(id) {
    try {
      logger.info(`Getting product`)
      return await ProductModel.findById(id)
    } catch (error) {
      logger.error(`Error getting product: ${error.message}`)
      throw error
    }
  }

  async create(product) {
    try {
      logger.info(`Creating product`)
      return await ProductModel.create(product)
    } catch (error) {
      logger.error(`Error creating product: ${error.message}`)
      throw error
    }
  }

  async update(id, product) {
    try {
      logger.info(`Updating product`)
      return await ProductModel.findByIdAndUpdate(
        id,
        { $set: product },
        { new: true, runValidators: true }
      )
    } catch (error) {
      logger.error(`Error updating product: ${error.message}`)
      throw error
    }
  }

  async delete(id) {
    try {
      logger.info(`Deleting product`)
      return await ProductModel.findByIdAndDelete(id)
    } catch (error) {
      logger.error(`Error deleting product: ${error.message}`)
      throw error
    }
  }

  async deleteAll() {
    try {
      logger.info(`Deleting products`)
      return await ProductModel.deleteMany({})
    } catch (error) {
      logger.error(`Error deleting products: ${error.message}`)
      throw error
    }
  }
}

export default new ProductDAO()
