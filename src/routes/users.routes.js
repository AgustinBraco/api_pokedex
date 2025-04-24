import express from 'express'
import UserDAO from '../DAO/users.dao.js'
import UserDTO from '../DTO/user.dto.js'
import { isAuth, isAdmin, isValidUser } from '../middlewares/middlewares.js'

const usersRoute = express.Router()

// Check
usersRoute.get('/check', (req, res) =>
  res.status(200).json({
    status: 'success',
    message: 'Users running correctly'
  })
)

// Retrieve all users
usersRoute.get('/', isAuth, isAdmin, async (req, res) => {
  const users = await UserDAO.getAll()

  res.status(200).json({
    status: 'success',
    message: 'Users retrieved successfully',
    data: users
  })
})

// Retrieve user by ID
usersRoute.get('/:id', isAuth, isAdmin, async (req, res) => {
  const { id } = req.params
  const user = await UserDAO.getById(id)

  user
    ? res.status(200).json({
        status: 'success',
        message: 'User retrieved successfully',
        data: user
      })
    : res.status(404).json({
        status: 'error',
        message: 'User not found'
      })
})

// Create user
usersRoute.post('/', isAuth, isAdmin, isValidUser, async (req, res) => {
  const { firstName, lastName, birthday, gender, email, password } = req.body

  // Validate if already exist
  const userExist = await UserDAO.getByEmail(email)
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
  await UserDAO.create(user)

  // Create data and send
  const data = {
    email: user.email,
    role: user.role
  }

  return res.status(200).json({
    status: 'success',
    message: 'User created successfully',
    data
  })
})

// Update user by ID
usersRoute.put('/:id', isAuth, isAdmin, isValidUser, async (req, res) => {
  const { id } = req.params
  const { firstName, lastName, birthday, gender, email, password } = req.body

  // Validate if exist
  const userDB = await UserDAO.getById(id)
  if (!userDB) {
    return res.status(404).json({
      status: 'error',
      message: 'User not found'
    })
  }

  // Validate non duplicate email
  const userExist = await UserDAO.getByEmail(email)
  const isDifferentUser = userExist._id.toString() !== id

  if (userExist && isDifferentUser) {
    return res.status(400).json({
      status: 'error',
      message: 'Email already exist'
    })
  }

  // Update user
  const user = await UserDTO.create({
    firstName,
    lastName,
    birthday,
    gender,
    email,
    password
  })
  await UserDAO.update(id, user)

  // Create data and send
  const data = {
    email: user.email,
    role: user.role
  }

  return res.status(200).json({
    status: 'success',
    message: 'User updated successfully',
    data
  })
})

// Delete user by ID
usersRoute.delete('/:id', isAuth, isAdmin, async (req, res) => {
  const { id } = req.params

  // Validate if exist
  const userDB = await UserDAO.getById(id)
  if (!userDB) {
    return res.status(404).json({
      status: 'error',
      message: 'User not found'
    })
  }

  // Delete and send response
  await UserDAO.delete(id)

  return res.status(200).json({
    status: 'success',
    message: 'User deleted successfully'
  })
})

// Delete all users
usersRoute.delete('/', isAuth, isAdmin, async (req, res) => {
  await UserDAO.deleteAll()

  res.status(200).json({
    status: 'success',
    message: 'Users deleted successfully'
  })
})

export default usersRoute
