import jwt from 'jsonwebtoken'
import environment from '../environment/environment.js'
import logger from '../logger.js'

export const isValidLogin = (req, res, next) => {
  logger.info(
    `Login middleware ${req.method} ${req.method} ${req.originalUrl} received`
  )

  const { email, password } = req.body

  // Validate credentials
  const isInvalidCredentials =
    email.length <= 0 ||
    typeof email !== 'string' ||
    password.length <= 0 ||
    typeof password !== 'string'

  if (isInvalidCredentials) {
    const response = {
      status: 'error',
      message: `Invalid email or password`
    }

    logger.warn(`Responded with 400: ${JSON.stringify(response)}`)

    return res.status(400).json(response)
  }

  logger.info(`Login middleware passed`)
  next()
}

export const isValidAdmin = (req, res, next) => {
  logger.debug(`Admin middleware ${req.method} ${req.originalUrl} received`)

  const { admin_key } = req.headers
  const { email, password, role } = req.body

  // Validate credentials
  const isInvalidAdmin =
    email !== environment.ADMIN_EMAIL ||
    password !== environment.ADMIN_PASSWORD ||
    role !== environment.ADMIN_ROLE ||
    admin_key !== environment.ADMIN_KEY

  if (isInvalidAdmin) {
    const response = {
      status: 'error',
      message: 'Invalid credentials'
    }

    logger.warn(`Responded with 401: ${JSON.stringify(response)}`)

    return res.status(401).json(response)
  }

  logger.info(`Admin middleware passed`)
  next()
}

export const isAuth = (req, res, next) => {
  logger.debug(`Auth middleware ${req.method} ${req.originalUrl} received`)

  // Get and format token
  const authorization = req.headers['authorization']
  const token = authorization?.split(' ')[1]

  // Verify token
  jwt.verify(token, environment.JWT_SECRET, (error, user) => {
    if (error) {
      const response = {
        status: 'error',
        message: 'Invalid or missing token'
      }

      logger.warn(`Responded with 401: ${JSON.stringify(response)}`)

      return res.status(401).json(response)
    }

    logger.info(`Auth middleware passed`)
    next()
  })
}

export const isAdmin = (req, res, next) => {
  logger.debug(`Admin middleware ${req.method} ${req.originalUrl} received`)

  // Get and format token
  const authorization = req.headers['authorization']
  const token = authorization?.split(' ')[1]

  // Verify token
  jwt.verify(token, environment.JWT_SECRET, (error, user) => {
    if (error) {
      const response = {
        status: 'error',
        message: 'Invalid or missing token'
      }

      logger.warn(`Responded with 401: ${JSON.stringify(response)}`)

      return res.status(401).json(response)
    }

    // Verify role
    const isNotAdmin = user.role !== environment.ADMIN_ROLE

    if (isNotAdmin) {
      const response = {
        status: 'error',
        message: 'Access denied'
      }

      logger.warn(`Responded with 403: ${JSON.stringify(response)}`)

      return res.status(403).json(response)
    }

    logger.info(`Admin middleware passed`)
    next()
  })
}
