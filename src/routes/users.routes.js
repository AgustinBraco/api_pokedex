import express from 'express'
import logger from '../logger/logger.js'
import UserDAO from '../DAO/users.dao.js'
import UserDTO from '../DTO/user.dto.js'
import { isAuth, isAdmin, isValidUser } from '../middlewares/middlewares.js'

const usersRoute = express.Router()

// Check
usersRoute.get('/check', (req, res) => {
  try {
    logger.info('GET /api/crud/users/check received')

    const response = {
      status: 'success',
      message: 'Users running correctly'
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

// Retrieve all users
usersRoute.get('/', isAuth, isAdmin, async (req, res) => {
  try {
    logger.info('GET /api/crud/users received')

    const users = await UserDAO.getAll()

    const response = {
      status: 'success',
      message: 'Users retrieved successfully',
      data: users
    }

    logger.info(`Responded with 200: ${JSON.stringify(response)}`)

    res.status(200).json(response)
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

// Create user
usersRoute.post('/', isAuth, isAdmin, isValidUser, async (req, res) => {
  try {
    logger.info('POST /api/crud/users received')
    let response

    const { firstName, lastName, birthday, gender, email, password } = req.body

    // Validate if already exist
    const userExist = await UserDAO.getByEmail(email)
    if (userExist) {
      response = {
        status: 'error',
        message: 'Email already exist'
      }

      logger.info(`Responded with 409: ${JSON.stringify(response)}`)

      return res.status(409).json(response)
    }

    // Create and retrieve user
    const user = await UserDTO.create({
      firstName,
      lastName,
      birthday,
      gender,
      email,
      password
    })
    const data = await UserDAO.create(user)

    response = {
      status: 'success',
      message: 'User created successfully',
      data
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

// Delete all users
usersRoute.delete('/', isAuth, isAdmin, async (req, res) => {
  try {
    logger.info('DELETE /api/crud/users received')

    await UserDAO.deleteAll()

    const response = {
      status: 'success',
      message: 'Users deleted successfully'
    }

    logger.info(`Responded with 200: ${JSON.stringify(response)}`)

    res.status(200).json(response)
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

// Retrieve user by ID
usersRoute.get('/:id', isAuth, isAdmin, async (req, res) => {
  try {
    let response
    const { id } = req.params

    logger.info(`GET /api/crud/users/${id} received`)

    const user = await UserDAO.getById(id)

    if (!user) {
      response = {
        status: 'error',
        message: 'User not found'
      }

      logger.info(`Responded with 404: ${JSON.stringify(response)}`)

      return res.status(404).json(response)
    }

    response = {
      status: 'success',
      message: 'User retrieved successfully',
      data: user
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

// Update user by ID
usersRoute.put('/:id', isAuth, isAdmin, isValidUser, async (req, res) => {
  try {
    let response
    const { id } = req.params

    logger.info(`PUT /api/crud/users/${id} received`)

    const { firstName, lastName, birthday, gender, email, password } = req.body

    // Validate if exist
    const userDB = await UserDAO.getById(id)
    if (!userDB) {
      response = {
        status: 'error',
        message: 'User not found'
      }

      logger.info(`Responded with 404: ${JSON.stringify(response)}`)

      return res.status(404).json(response)
    }

    // Validate non duplicate email
    const userExist = await UserDAO.getByEmail(email)
    if (userExist && userExist._id.toString() !== id) {
      response = {
        status: 'error',
        message: 'Email already exist'
      }

      logger.info(`Responded with 409: ${JSON.stringify(response)}`)

      return res.status(409).json(response)
    }

    // Update and retrieve user
    const user = await UserDTO.create({
      firstName,
      lastName,
      birthday,
      gender,
      email,
      password
    })

    const data = await UserDAO.update(id, user)

    response = {
      status: 'success',
      message: 'User updated successfully',
      data
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

// Delete user by ID
usersRoute.delete('/:id', isAuth, isAdmin, async (req, res) => {
  try {
    let response
    const { id } = req.params

    logger.info(`DELETE /api/crud/users/${id} received`)

    // Validate if exist
    const userDB = await UserDAO.getById(id)
    if (!userDB) {
      response = {
        status: 'error',
        message: 'User not found'
      }

      logger.info(`Responded with 404: ${JSON.stringify(response)}`)

      return res.status(404).json(response)
    }

    // Delete and send response
    await UserDAO.delete(id)

    response = {
      status: 'success',
      message: 'User deleted successfully'
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

export default usersRoute
