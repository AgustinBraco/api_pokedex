import express from 'express'
import jwt from 'jsonwebtoken'
import environment from '../environment/environment.js'
import AuthDAO from '../DAO/auth.dao.js'
import { verifyPassword } from '../utils/encrypt.js'
import {
  isValidRegister,
  isValidLogin,
  isValidAdmin,
  isAuth,
  isAdmin
} from '../middlewares/middlewares.js'

const authRoute = express.Router()

// Check
authRoute.get('/check', (req, res) =>
  res.status(200).json({
    status: 'success',
    message: 'Auth running correctly'
  })
)

// Register
authRoute.post('/register', isValidRegister, async (req, res) => {
  let user = req.user

  const userExist = await AuthDAO.getUser(user.email)

  if (userExist) {
    return res.status(400).json({
      status: 'error',
      message: 'Email already exist'
    })
  } else {
    await AuthDAO.createUser(user)

    user = {
      email: req.user.email,
      role: req.user.role
    }

    return res.status(200).json({
      status: 'success',
      message: 'User created successfully',
      token: jwt.sign(user, environment.JWT_SECRET, { expiresIn: '1h' })
    })
  }
})

// Login
authRoute.post('/login', isValidLogin, async (req, res) => {
  let user = req.user

  const userDB = await AuthDAO.getUser(user.email)

  if (!userDB)
    return res.status(404).json({
      status: 'error',
      message: 'Email does not exist'
    })

  const isValidPassword = await verifyPassword(user.password, userDB.password)

  if (isValidPassword) {
    user = {
      email: req.user.email,
      role: req.user.role
    }

    return res.status(200).json({
      status: 'success',
      message: 'User created successfully',
      token: jwt.sign(user, environment.JWT_SECRET, { expiresIn: '1h' })
    })
  } else {
    return res.status(400).json({
      status: 'error',
      message: 'Invalid credentials'
    })
  }
})

// Login admin
authRoute.post('/login/admin', isValidAdmin, (req, res) => {
  const user = req.user

  return res.status(200).json({
    status: 'success',
    message: 'Admin loged successfully',
    token: jwt.sign(user, environment.JWT_SECRET, { expiresIn: '1h' })
  })
})

// Private
authRoute.get('/private', isAuth, (req, res) =>
  res.status(200).json({
    status: 'success',
    message: 'Successfully access to private route'
  })
)

// Admin
authRoute.get('/admin', isAuth, isAdmin, (req, res) =>
  res.status(200).json({
    status: 'success',
    message: 'Successfully access to admin route'
  })
)

export default authRoute
