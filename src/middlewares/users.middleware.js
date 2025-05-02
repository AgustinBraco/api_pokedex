import logger from '../logger/logger.js'

export const isValidUser = async (req, res, next) => {
  logger.info(`User middleware receive ${req.method} ${req.originalUrl}`)

  // Get info and create user
  const { firstName, lastName, birthday, gender, email, password } = req.body

  let user = {
    firstName,
    lastName,
    birthday,
    gender,
    email,
    password
  }

  logger.debug(
    `Body received: ${JSON.stringify({
      ...user,
      password: '**********'
    })}`
  )

  // Validate each field
  for (const field in user)
    if (user[field].length <= 0 || typeof user[field] !== 'string') {
      const response = {
        status: 'error',
        message: `Invalid field '${field}'`
      }

      logger.warn(`Responded with 400: ${JSON.stringify(response)}`)

      return res.status(400).json(response)
    }

  logger.info(`User middleware passed`)
  next()
}
