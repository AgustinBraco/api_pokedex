import logger from '../logger/logger.js'
import { Responses } from '../utils/utils.js'

export const isValidUser = async (req, res, next) => {
  logger.info(`User middleware receive ${req.method} ${req.originalUrl}`)

  const { first_name, last_name, birthday, gender, email, password } = req.body

  let user = {
    first_name,
    last_name,
    birthday,
    gender,
    email,
    password
  }

  // Validate fields
  for (const field in user)
    if (user[field].length <= 0 || typeof user[field] !== 'string')
      return Responses.badRequest(res, `Invalid field '${field}'`)

  logger.info(`User middleware passed`)
  next()
}
