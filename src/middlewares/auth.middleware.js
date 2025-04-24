import jwt from 'jsonwebtoken'
import environment from '../environment/environment.js'

export const isValidLogin = (req, res, next) => {
  const { email, password } = req.body

  // Validate credentials
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

  next()
}

export const isValidAdmin = (req, res, next) => {
  const { admin_key } = req.headers
  const { email, password, role } = req.body

  // Validate credentials
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
  }

  next()
}

export const isAuth = (req, res, next) => {
  // Get and format token
  const authorization = req.headers['authorization']
  const token = authorization?.split(' ')[1]

  // Verify token
  jwt.verify(token, environment.JWT_SECRET, (error, user) => {
    if (error) {
      return res.status(401).json({
        status: 'error',
        message: 'Invalid or missing token'
      })
    }

    next()
  })
}

export const isAdmin = (req, res, next) => {
  // Get and format token
  const authorization = req.headers['authorization']
  const token = authorization?.split(' ')[1]

  // Verify token
  jwt.verify(token, environment.JWT_SECRET, (error, user) => {
    if (error) {
      return res.status(401).json({
        status: 'error',
        message: 'Invalid or missing token'
      })
    }

    // Verify role
    const isNotAdmin = user.role !== environment.ADMIN_ROLE

    if (isNotAdmin)
      return res.status(403).json({
        status: 'error',
        message: 'Access denied'
      })

    next()
  })
}
