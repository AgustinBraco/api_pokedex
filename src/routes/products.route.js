import express from 'express'
import ProductDAO from '../DAO/products.dao.js'

const productsRoute = express.Router()

// Check
productsRoute.get('/check', (req, res) =>
  res.status(200).json({
    status: 'success',
    message: 'Products running correctly'
  })
)

// Retrieve products
productsRoute.get('/', async (req, res) => {
  const products = await ProductDAO.getAll()

  res.status(200).json({
    status: 'success',
    message: 'Products retrieved successfully',
    data: products
  })
})

export default productsRoute
