import express from 'express'
import logger from '../logger/logger.js'
import ProductDAO from '../DAO/products.dao.js'
import ProductDTO from '../DTO/product.dto.js'
import { isAuth, isAdmin, isValidProduct } from '../middlewares/middlewares.js'

const productsRoute = express.Router()

// Check
productsRoute.get('/check', (req, res) => {
  try {
    logger.info('GET /api/crud/products/check received')

    const response = {
      status: 'success',
      message: 'Products running correctly'
    }

    logger.info(`Responded with 200: ${JSON.stringify(response)}`)

    return res.status(200).json(response)
  } catch (error) {
    const response = {
      status: 'error',
      message: 'Internal server error',
      error: error.message
    }

    logger.error(`Responded with 500: ${JSON.stringify(response)}`)

    return res.status(500).json(response)
  }
})

// Retrieve all products
productsRoute.get('/', async (req, res) => {
  try {
    logger.info('GET /api/crud/products received')

    const products = await ProductDAO.getAll()

    const response = {
      status: 'success',
      message: 'Products retrieved successfully',
      data: products
    }

    logger.info(`Responded with 200: ${JSON.stringify(response)}`)

    return res.status(200).json(response)
  } catch (error) {
    const response = {
      status: 'error',
      message: 'Internal server error',
      error: error.message
    }

    logger.error(`Responded with 500: ${JSON.stringify(response)}`)

    return res.status(500).json(response)
  }
})

// Create product
productsRoute.post('/', isAuth, isAdmin, isValidProduct, async (req, res) => {
  try {
    logger.info('POST /api/crud/products received')

    const { name, category, stock, price } = req.body

    const product = new ProductDTO({
      name,
      category,
      stock,
      price
    })

    const data = await ProductDAO.create(product)

    const response = {
      status: 'success',
      message: 'Product created successfully',
      data
    }

    logger.info(`Responded with 200: ${JSON.stringify(response)}`)

    return res.status(200).json(response)
  } catch (error) {
    const response = {
      status: 'error',
      message: 'Internal server error',
      error: error.message
    }

    logger.error(`Responded with 500: ${JSON.stringify(response)}`)

    return res.status(500).json(response)
  }
})

// Delete all products
productsRoute.delete('/', isAuth, isAdmin, async (req, res) => {
  try {
    logger.info('DELETE /api/crud/products received')

    await ProductDAO.deleteAll()

    const response = {
      status: 'success',
      message: 'Products deleted successfully'
    }

    logger.info(`Responded with 200: ${JSON.stringify(response)}`)

    return res.status(200).json(response)
  } catch (error) {
    const response = {
      status: 'error',
      message: 'Internal server error',
      error: error.message
    }

    logger.error(`Responded with 500: ${JSON.stringify(response)}`)

    return res.status(500).json(response)
  }
})

// Retrieve product by ID
productsRoute.get('/:id', async (req, res) => {
  try {
    let response
    const { id } = req.params

    logger.info(`GET /api/crud/products/${id} received`)

    const product = await ProductDAO.getById(id)

    // Validate if exist
    if (!product) {
      response = {
        status: 'error',
        message: 'Product not found'
      }

      logger.info(`Responded with 404: ${JSON.stringify(response)}`)

      return res.status(404).json(response)
    }

    response = {
      status: 'success',
      message: 'Product retrieved successfully',
      data: product
    }

    logger.info(`Responded with 200: ${JSON.stringify(response)}`)

    return res.status(200).json(response)
  } catch (error) {
    const response = {
      status: 'error',
      message: 'Internal server error',
      error: error.message
    }

    logger.error(`Responded with 500: ${JSON.stringify(response)}`)

    return res.status(500).json(response)
  }
})

// Update product by ID
productsRoute.put('/:id', isAuth, isAdmin, isValidProduct, async (req, res) => {
  try {
    let response
    const { id } = req.params

    logger.info(`PUT /api/crud/products/${id} received`)

    const { name, category, stock, price } = req.body

    // Validate if exist
    const productDB = await ProductDAO.getById(id)
    if (!productDB) {
      response = {
        status: 'error',
        message: 'Product not found'
      }

      logger.info(`Responded with 404: ${JSON.stringify(response)}`)

      return res.status(404).json(response)
    }

    const product = new ProductDTO({
      name,
      category,
      stock,
      price
    })

    const data = await ProductDAO.update(id, product)

    response = {
      status: 'success',
      message: 'Product updated successfully',
      data
    }

    logger.info(`Responded with 200: ${JSON.stringify(response)}`)

    return res.status(200).json(response)
  } catch (error) {
    const response = {
      status: 'error',
      message: 'Internal server error',
      error: error.message
    }

    logger.error(`Responded with 500: ${JSON.stringify(response)}`)

    return res.status(500).json(response)
  }
})

// Delete product by ID
productsRoute.delete('/:id', isAuth, isAdmin, async (req, res) => {
  try {
    let response
    const { id } = req.params

    logger.info(`DELETE /api/crud/products/${id} received`)

    // Validate if exist
    const productDB = await ProductDAO.getById(id)
    if (!productDB) {
      response = {
        status: 'error',
        message: 'Product not found'
      }

      logger.info(`Responded with 404: ${JSON.stringify(response)}`)

      return res.status(404).json(response)
    }

    await ProductDAO.delete(id)

    response = {
      status: 'success',
      message: 'Product deleted successfully'
    }

    logger.info(`Responded with 200: ${JSON.stringify(response)}`)

    return res.status(200).json(response)
  } catch (error) {
    const response = {
      status: 'error',
      message: 'Internal server error',
      error: error.message
    }

    logger.error(`Responded with 500: ${JSON.stringify(response)}`)

    return res.status(500).json(response)
  }
})

export default productsRoute
