import express from 'express'
import swaggerUi from 'swagger-ui-express'
import docs from '../docs/docs.js'
import { auth, pokedex, users } from '../routes/routes.js'

const router = express.Router()

// Routes
router.use('/', pokedex)
router.use('/auth', auth)
router.use('/users', users)
router.use('/docs', swaggerUi.serve, swaggerUi.setup(docs))

export default router
