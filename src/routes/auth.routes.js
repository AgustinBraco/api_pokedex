import express from 'express'
import jwt from 'jsonwebtoken'
import environment from '../environment/environment.js'
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
authRoute.get('/check', (req, res) =>
  res.status(200).json({
    status: 'success',
    message: 'Auth running correctly'
  })
)

// Register user
authRoute.post('/register', isValidUser, async (req, res) => {
  const { firstName, lastName, birthday, gender, email, password } = req.body

  // Validate if already exist
  const userExist = await AuthDAO.getUser(email)
  if (userExist) {
    return res.status(400).json({
      status: 'error',
      message: 'Email already exist'
    })
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

  // Create data and send token
  const data = {
    email: user.email,
    role: user.role
  }

  return res.status(200).json({
    status: 'success',
    message: 'User created successfully',
    token: jwt.sign(data, environment.JWT_SECRET, { expiresIn: '1h' })
  })
})

// Login user
authRoute.post('/login', isValidLogin, async (req, res) => {
  const { email, password } = req.body

  // Validate if exist
  const user = await AuthDAO.getUser(email)
  if (!user)
    return res.status(404).json({
      status: 'error',
      message: 'Email does not exist'
    })

  // Validate password
  const isValidPassword = await verifyPassword(password, user.password)
  if (!isValidPassword)
    return res.status(400).json({
      status: 'error',
      message: 'Invalid credentials'
    })

  // Create data and send token
  const data = {
    email: user.email,
    role: user.role
  }

  return res.status(200).json({
    status: 'success',
    message: 'User created successfully',
    token: jwt.sign(data, environment.JWT_SECRET, { expiresIn: '1h' })
  })
})

// Login admin
authRoute.post('/login/admin', isValidAdmin, (req, res) => {
  const { email, role } = req.body

  const data = {
    email,
    role
  }

  return res.status(200).json({
    status: 'success',
    message: 'Admin loged successfully',
    token: jwt.sign(data, environment.JWT_SECRET, { expiresIn: '1h' })
  })
})

export default authRoute
