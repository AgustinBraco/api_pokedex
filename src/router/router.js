import express from 'express'
import swaggerUi from 'swagger-ui-express'
import docs from '../docs/docs.js'
import { authRoute, usersRoute, productsRoute } from '../routes/routes.js'
import { isAuth, isAdmin } from '../middlewares/middlewares.js'

const router = express.Router()

// Check
router.get('/', (req, res) =>
  res.status(200).json({
    status: 'success',
    message: 'Service running correctly'
  })
)

// Docs
// router.use('/docs', isAuth, isAdmin, swaggerUi.serve, swaggerUi.setup(docs))
router.use('/docs', swaggerUi.serve, swaggerUi.setup(docs))

// Routes
router.use('/auth', authRoute)
router.use('/users', usersRoute)
router.use('/products', productsRoute)

export default router
