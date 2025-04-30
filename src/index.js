import express from 'express'
import cors from 'cors'
import connectDB from './database/database.js'
import environment from './environment/environment.js'
import router from './router/router.js'

// Initiate
const app = express()
connectDB()

// Set up
app.use(express.json())
app.use(
  cors({
    origin: environment.ORIGIN_URL,
    methods: ['GET, POST, UPDATE, DELETE'],
    allowedHeaders: ['Content-Type, Authorization'],
    credentials: true
  })
)

// Router
app.use('/api/crud', router)

// Server
app.listen(environment.PORT, () => console.log('Service running on port 5000'))

export default app