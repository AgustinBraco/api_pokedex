import express from 'express'
import jwt from 'jsonwebtoken'
import environment from '../environment/environment.js'
import logger from '../logger/logger.js'
import AuthDAO from '../DAO/auth.dao.js'
import UserDTO from '../DTO/user.dto.js'
import { verifyPassword } from '../utils/encrypt.js'
import { Responses } from '../utils/utils.js'
import {
  isValidUser,
  isValidLogin,
  isValidAdmin
} from '../middlewares/middlewares.js'

const auth = express.Router()

// Check
auth.get('/check', (req, res) => {
  try {
    logger.info('GET /api/pokedex/auth/check received')
    return Responses.success(res, 'Auth running correctly')
  } catch (error) {
    return Responses.error(res, error)
  }
})

// Register user
auth.post('/register', isValidUser, async (req, res) => {
  try {
    logger.info('POST /api/pokedex/auth/register received')

    let user, token
    const { first_name, last_name, birthday, gender, email, password } =
      req.body

    // Validate if already exist
    user = await AuthDAO.getUser(email)
    if (user) return Responses.conflict(res, 'Email already exist')

    // Create user
    user = await UserDTO.create({
      first_name,
      last_name,
      birthday,
      gender,
      email,
      password
    })
    await AuthDAO.createUser(user)

    // Create and respond token
    token = jwt.sign(
      {
        email: user.email,
        role: user.role
      },
      environment.JWT_SECRET,
      { expiresIn: '1h' }
    )

    return Responses.success(res, 'User created successfully', token)
  } catch (error) {
    return Responses.error(res, error)
  }
})

// Login user
auth.post('/login', isValidLogin, async (req, res) => {
  try {
    logger.info('POST /api/pokedex/auth/login received')

    const { email, password } = req.body
    let user, token

    // Validate if exist
    user = await AuthDAO.getUser(email)
    if (!user) return Responses.notFound(res, 'Email does not exist')

    // Validate password
    const isValidPassword = await verifyPassword(password, user.password)
    if (!isValidPassword)
      return Responses.unauthorized(res, 'Invalid credentials')

    // Create and respond token
    token = jwt.sign(
      {
        email: user.email,
        role: user.role
      },
      environment.JWT_SECRET,
      { expiresIn: '1h' }
    )

    return Responses.success(res, 'User loged successfully', token)
  } catch (error) {
    return Responses.error(res, error)
  }
})

// Login admin
auth.post('/login/admin', isValidAdmin, (req, res) => {
  try {
    logger.info('POST /api/pokedex/auth/login/admin received')

    let token
    const { email, role } = req.body

    // Create and respond token
    token = jwt.sign(
      {
        email,
        role
      },
      environment.JWT_SECRET,
      { expiresIn: '1h' }
    )

    return Responses.success(res, 'Admin loged successfully', token)
  } catch (error) {
    return Responses.error(res, error)
  }
})

export default auth
