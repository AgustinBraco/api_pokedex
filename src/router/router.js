import express from 'express'
import swaggerUi from 'swagger-ui-express'
import docs from '../docs/docs.js'
import logger from '../logger/logger.js'
import { authRoute, usersRoute, productsRoute } from '../routes/routes.js'
import { isAuth, isAdmin } from '../middlewares/middlewares.js'

const router = express.Router()

// Check
router.get('/', (req, res) => {
  logger.info('GET /api/crud received')

  const response = {
    status: 'success',
    message: 'Service running correctly'
  }

  logger.info(`Responded with 200: ${JSON.stringify(response)}`)

  return res.status(200).json(response)
})

// Docs
router.use('/docs', isAuth, isAdmin, swaggerUi.serve, swaggerUi.setup(docs))

// Routes
router.use('/auth', authRoute)
router.use('/users', usersRoute)
router.use('/products', productsRoute)

export default router
