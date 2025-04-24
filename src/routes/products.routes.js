import express from 'express'
import ProductDAO from '../DAO/products.dao.js'
import ProductDTO from '../DTO/product.dto.js'
import { isAuth, isAdmin, isValidProduct } from '../middlewares/middlewares.js'

const productsRoute = express.Router()

// Check
productsRoute.get('/check', (req, res) =>
  res.status(200).json({
    status: 'success',
    message: 'Products running correctly'
  })
)

// Retrieve all products
productsRoute.get('/', async (req, res) => {
  const products = await ProductDAO.getAll()

  res.status(200).json({
    status: 'success',
    message: 'Products retrieved successfully',
    data: products
  })
})

// Retrieve product by ID
productsRoute.get('/:id', async (req, res) => {
  const { id } = req.params
  const product = await ProductDAO.getById(id)

  product
    ? res.status(200).json({
        status: 'success',
        message: 'Product retrieved successfully',
        data: product
      })
    : res.status(404).json({
        status: 'error',
        message: 'Product not found'
      })
})

// Create product
productsRoute.post('/', isAuth, isAdmin, isValidProduct, async (req, res) => {
  const { name, category, stock, price } = req.body

  const product = new ProductDTO({
    name,
    category,
    stock,
    price
  })

  const data = await ProductDAO.create(product)

  return res.status(200).json({
    status: 'success',
    message: 'Product created successfully',
    data
  })
})

// Update product by ID
productsRoute.put('/:id', isAuth, isAdmin, isValidProduct, async (req, res) => {
  const { id } = req.params
  const { name, category, stock, price } = req.body

  // Validate if exist
  const productDB = await ProductDAO.getById(id)
  if (!productDB) {
    return res.status(404).json({
      status: 'error',
      message: 'Product not found'
    })
  }

  const product = new ProductDTO({
    name,
    category,
    stock,
    price
  })

  const data = await ProductDAO.update(id, product)

  return res.status(200).json({
    status: 'success',
    message: 'Product updated successfully',
    data
  })
})

// Delete product by ID
productsRoute.delete('/:id', isAuth, isAdmin, async (req, res) => {
  const { id } = req.params

  // Validate if exist
  const productDB = await ProductDAO.getById(id)
  if (!productDB) {
    return res.status(404).json({
      status: 'error',
      message: 'Product not found'
    })
  }

  await ProductDAO.delete(id)

  return res.status(200).json({
    status: 'success',
    message: 'Product deleted successfully'
  })
})

// Delete all products
productsRoute.delete('/', isAuth, isAdmin, async (req, res) => {
  await ProductDAO.deleteAll()

  res.status(200).json({
    status: 'success',
    message: 'Products deleted successfully'
  })
})

export default productsRoute
