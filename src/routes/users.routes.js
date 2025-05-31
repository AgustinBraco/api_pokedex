import express from 'express'
import logger from '../logger/logger.js'
import UserDAO from '../DAO/users.dao.js'
import UserDTO from '../DTO/user.dto.js'
import { isAuth, isAdmin, isValidUser } from '../middlewares/middlewares.js'
import { Responses } from '../utils/utils.js'

const usersRoute = express.Router()

// Check
usersRoute.get('/check', (req, res) => {
  try {
    logger.info('GET /api/pokedex/users/check received')

    return Responses.success(res, 'Users running correctly')
  } catch (error) {
    return Responses.error(res, error)
  }
})

// Retrieve all users
usersRoute.get('/all', isAuth, isAdmin, async (req, res) => {
  try {
    logger.info('GET /api/pokedex/users received')
    let data

    data = await UserDAO.getAll()

    return Responses.success(res, 'Users retrieved successfully', data || [])
  } catch (error) {
    return Responses.error(res, error)
  }
})

// Create user
usersRoute.post('/', isAuth, isAdmin, isValidUser, async (req, res) => {
  try {
    logger.info('POST /api/pokedex/users received')
    let user

    const { first_name, last_name, birthday, gender, email, password } =
      req.body

    // Validate if already exist
    user = await UserDAO.getByEmail(email)
    if (user) return Responses.conflict(res, 'Email already exist')

    user = await UserDTO.create({
      first_name,
      last_name,
      birthday,
      gender,
      email,
      password
    })

    await UserDAO.create(user)

    return Responses.success(res, 'User created successfully')
  } catch (error) {
    return Responses.error(res, error)
  }
})

// Delete all users
usersRoute.delete('/all', isAuth, isAdmin, async (req, res) => {
  try {
    logger.info('DELETE /api/pokedex/users received')

    await UserDAO.deleteAll()

    return Responses.success(res, 'Users deleted successfully')
  } catch (error) {
    return Responses.error(res, error)
  }
})

// Retrieve user by ID
usersRoute.get('/:id', isAuth, isAdmin, async (req, res) => {
  try {
    const { id } = req.params
    logger.info(`GET /api/pokedex/users/${id} received`)

    let user

    // Validate if exist
    user = await UserDAO.getByID(id)
    if (!user) return Responses.notFound(res, 'User not found')

    return Responses.success(res, 'User retrieved successfully', user)
  } catch (error) {
    return Responses.error(res, error)
  }
})

// Update user by ID
usersRoute.put('/:id', isAuth, isAdmin, isValidUser, async (req, res) => {
  try {
    const { id } = req.params
    logger.info(`PUT /api/pokedex/users/${id} received`)

    let user, data

    const { first_name, last_name, birthday, gender, email, password } =
      req.body

    // Validate if exist
    user = await UserDAO.getByID(id)
    if (!user) return Responses.notFound(res, 'User not found')

    // Validate non duplicate email
    const userExist = await UserDAO.getByEmail(email)
    if (userExist && userExist.id.toString() !== id)
      return Responses.conflict(res, 'Email already exist')

    user = await UserDTO.update({
      first_name,
      last_name,
      birthday,
      gender,
      email,
      password
    })

    data = await UserDAO.update(id, user)

    return Responses.success(res, 'User updated successfully', data)
  } catch (error) {
    return Responses.error(res, error)
  }
})

// Delete user by ID
usersRoute.delete('/:id', isAuth, isAdmin, async (req, res) => {
  try {
    const { id } = req.params
    logger.info(`DELETE /api/pokedex/users/${id} received`)

    let user

    // Validate if exist
    user = await UserDAO.getByID(id)
    if (!user) return Responses.notFound(res, 'User not found')

    await UserDAO.delete(id)

    return Responses.success(res, 'User deleted successfully')
  } catch (error) {
    return Responses.error(res, error)
  }
})

export default usersRoute
