import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import rateLimit from 'express-rate-limit'
import connectDB from './database/database.js'
import environment from './environment/environment.js'
import router from './router/router.js'
import logger from './logger/logger.js'

// Initiate
const app = express()
connectDB()

// Set up
app.use(helmet())
app.use(express.json())
app.use(
  cors({
    origin: environment.ORIGIN_URL,
    methods: ['GET, POST, UPDATE, DELETE'],
    allowedHeaders: ['Content-Type, Authorization'],
    credentials: true
  })
)
app.use(
  rateLimit({
    windowMs: 900000, // 15 minutes
    max: 100,
    message: 'Too many requests. Please try again later.',
    headers: true
  })
)

// Router
app.use('/api/crud', router)

// Server
app.listen(environment.PORT, () =>
  logger.info(`Service running on port ${environment.PORT}`)
)

export default app
