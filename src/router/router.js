import express from 'express'
import swaggerUi from 'swagger-ui-express'
import docs from '../docs/docs.js'
import { auth, pokedex, users } from '../routes/routes.js'
import { isAuth, isAdmin } from '../middlewares/middlewares.js'

const router = express.Router()

// Routes
router.use('/', pokedex)
router.use('/auth', auth)
router.use('/users', users)
router.use('/docs', isAuth, isAdmin, swaggerUi.serve, swaggerUi.setup(docs))

export default router
