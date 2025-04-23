import jwt from 'jsonwebtoken'
import environment from '../environment/environment.js'
import UserDTO from '../DTO/user.dto.js'

// Register
export const isValidRegister = async (req, res, next) => {
  const { firstName, lastName, birthday, gender, email, password } = req.body

  let user = {
    firstName,
    lastName,
    birthday,
    gender,
    email,
    password
  }

  for (const field in user)
    if (user[field].length <= 0 || typeof user[field] !== 'string')
      return res.status(400).json({
        status: 'error',
        message: `Invalid field ${field}`
      })

  req.user = await UserDTO.create(user)

  next()
}

// Login
export const isValidLogin = (req, res, next) => {
  const { email, password } = req.body

  const isInvalidCredentials =
    email.length <= 0 ||
    typeof email !== 'string' ||
    password.length <= 0 ||
    typeof password !== 'string'

  if (isInvalidCredentials)
    return res.status(400).json({
      status: 'error',
      message: `Invalid credentials`
    })

  req.user = {
    email,
    password,
    role: 'user'
  }

  next()
}

// Login admin
export const isValidAdmin = (req, res, next) => {
  const { admin_key } = req.headers
  const { email, password, role } = req.body

  const isInvalidAdmin =
    email !== environment.ADMIN_EMAIL ||
    password !== environment.ADMIN_PASSWORD ||
    role !== environment.ADMIN_ROLE ||
    admin_key !== environment.ADMIN_KEY

  if (isInvalidAdmin) {
    return res.status(401).json({
      status: 'error',
      message: 'Invalid credentials'
    })
  } else {
    req.user = {
      email,
      role: environment.ADMIN_ROLE
    }
    next()
  }
}

// Auth
export const isAuth = (req, res, next) => {
  const authorization = req.headers['authorization']
  const token = authorization?.split(' ')[1]

  jwt.verify(token, environment.JWT_SECRET, (error, user) => {
    if (error) {
      res.status(401).json({
        status: 'error',
        message: 'Invalid or missing token'
      })
    } else {
      req.user = user
      next()
    }
  })
}

// Admin
export const isAdmin = (req, res, next) => {
  const isNotAdmin = req.user.role !== environment.ADMIN_ROLE
  if (isNotAdmin)
    res.status(403).json({
      status: 'error',
      message: 'Access denied'
    })
  else next()
}
