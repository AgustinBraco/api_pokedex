import express from 'express'
import { authRoute, usersRoute, productsRoute } from '../routes/routes.js'

const router = express.Router()

// Check
router.get('/', (req, res) =>
  res.status(200).json({
    status: 'success',
    message: 'Service running correctly'
  })
)

// Routes
router.use('/auth', authRoute)
router.use('/users', usersRoute)
router.use('/products', productsRoute)

export default router
