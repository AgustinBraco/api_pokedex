import express from 'express'
import jwt from 'jsonwebtoken'
import environment from '../environment/environment.js'
import logger from '../logger/logger.js'
import AuthDAO from '../DAO/auth.dao.js'
import UserDTO from '../DTO/user.dto.js'
import { verifyPassword } from '../utils/encrypt.js'
import {
  isValidUser,
  isValidLogin,
  isValidAdmin
} from '../middlewares/middlewares.js'

const authRoute = express.Router()

// Check
authRoute.get('/check', (req, res) => {
  try {
    logger.info('GET /api/crud/auth/check received')

    const response = {
      status: 'success',
      message: 'Auth running correctly'
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

// Register user
authRoute.post('/register', isValidUser, async (req, res) => {
  try {
    logger.info('POST /api/crud/auth/register received')

    const { firstName, lastName, birthday, gender, email, password } = req.body
    let response, data

    // Validate if already exist
    const userExist = await AuthDAO.getUser(email)
    if (userExist) {
      response = {
        status: 'error',
        message: 'Email already exist'
      }

      logger.warn(`Responded with 409: ${JSON.stringify(response)}`)

      return res.status(409).json(response)
    }

    // Create user
    const user = await UserDTO.create({
      firstName,
      lastName,
      birthday,
      gender,
      email,
      password
    })
    await AuthDAO.createUser(user)

    // Format data and send token
    data = {
      email: user.email,
      role: user.role
    }

    response = {
      status: 'success',
      message: 'User created successfully',
      token: jwt.sign(data, environment.JWT_SECRET, { expiresIn: '1h' })
    }

    logger.info(
      `Responded with 200: ${JSON.stringify({
        ...response,
        token: '**********'
      })}`
    )

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

// Login user
authRoute.post('/login', isValidLogin, async (req, res) => {
  try {
    logger.info('POST /api/crud/auth/login received')

    let response, data
    const { email, password } = req.body

    // Validate if exist
    const user = await AuthDAO.getUser(email)
    if (!user) {
      response = {
        status: 'error',
        message: 'Email does not exist'
      }

      logger.warn(`Responded with 404: ${JSON.stringify(response)}`)

      return res.status(404).json(response)
    }

    // Validate password
    const isValidPassword = await verifyPassword(password, user.password)
    if (!isValidPassword) {
      response = {
        status: 'error',
        message: 'Invalid credentials'
      }

      logger.warn(`Responded with 401: ${JSON.stringify(response)}`)

      return res.status(401).json(response)
    }

    // Format data and send token
    data = {
      email: user.email,
      role: user.role
    }

    response = {
      status: 'success',
      message: 'User loged successfully',
      token: jwt.sign(data, environment.JWT_SECRET, { expiresIn: '1h' })
    }

    logger.info(
      `Responded with 200: ${JSON.stringify({
        ...response,
        token: '**********'
      })}`
    )

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

// Login admin
authRoute.post('/login/admin', isValidAdmin, (req, res) => {
  try {
    logger.info('POST /api/crud/auth/login/admin received')

    let response, data
    const { email, role } = req.body

    // Format data and send token
    data = {
      email,
      role
    }

    response = {
      status: 'success',
      message: 'Admin loged successfully',
      token: jwt.sign(data, environment.JWT_SECRET, { expiresIn: '1h' })
    }

    logger.info(
      `Responded with 200: ${JSON.stringify({
        ...response,
        token: '**********'
      })}`
    )

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

export default authRoute
