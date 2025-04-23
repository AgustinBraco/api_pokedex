import express from 'express'
import { isAuth, isAdmin } from '../middlewares/middlewares.js'
import UserDAO from '../DAO/users.dao.js'

const usersRoute = express.Router()

// Check
usersRoute.get('/check', (req, res) =>
  res.status(200).json({
    status: 'success',
    message: 'Users running correctly'
  })
)

// Retrieve users
usersRoute.get('/', isAuth, isAdmin, async (req, res) => {
  const users = await UserDAO.getAll()

  res.status(200).json({
    status: 'success',
    message: 'Users retrieved successfully',
    data: users
  })
})

export default usersRoute
