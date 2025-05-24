import jwt from 'jsonwebtoken'
import environment from '../environment/environment.js'
import logger from '../logger/logger.js'
import { Responses } from '../utils/utils.js'

export const isValidLogin = (req, res, next) => {
  logger.info(
    `Login middleware receive receive ${req.method} ${req.originalUrl}`
  )

  const { email, password } = req.body

  // Validate credentials
  const isInvalidCredentials =
    email.length <= 0 ||
    typeof email !== 'string' ||
    password.length <= 0 ||
    typeof password !== 'string'

  if (isInvalidCredentials)
    return Responses.badRequest(res, `Invalid email or password`)

  logger.info(`Login middleware passed`)
  next()
}

export const isValidAdmin = (req, res, next) => {
  logger.info(`Admin middleware receive ${req.method} ${req.originalUrl}`)

  const { admin_key } = req.headers
  const { email, password, role } = req.body

  // Validate credentials
  const isInvalidAdmin =
    email !== environment.ADMIN_EMAIL ||
    password !== environment.ADMIN_PASSWORD ||
    role !== environment.ADMIN_ROLE ||
    admin_key !== environment.ADMIN_KEY

  if (isInvalidAdmin) return Responses.unauthorized(res, `Invalid credentials`)

  logger.info(`Admin middleware passed`)
  next()
}

export const isAuth = (req, res, next) => {
  logger.info(`Auth middleware receive ${req.method} ${req.originalUrl}`)

  // Get, format and validate token
  const authorization = req.headers['authorization']
  const token = authorization?.split(' ')[1]

  jwt.verify(token, environment.JWT_SECRET, error => {
    if (error) return Responses.unauthorized(res, `Invalid or missing token`)

    logger.info(`Auth middleware passed`)
    next()
  })
}

export const isAdmin = (req, res, next) => {
  logger.info(`Admin middleware receive ${req.method} ${req.originalUrl}`)

  // Get, format and validate token
  const authorization = req.headers['authorization']
  const token = authorization?.split(' ')[1]

  jwt.verify(token, environment.JWT_SECRET, (error, user) => {
    if (error) return Responses.unauthorized(res, `Invalid or missing token`)

    // Verify role
    const isNotAdmin = user.role !== environment.ADMIN_ROLE
    if (isNotAdmin) return Responses.forbidden(res, `Access denied`)

    logger.info(`Admin middleware passed`)
    next()
  })
}
