import logger from '../logger/logger.js'

export const isValidProduct = async (req, res, next) => {
  logger.info(`Product middleware ${req.method} ${req.originalUrl} received`)

  // Get info and create product
  const { name, category, stock, price } = req.body

  let product = {
    name,
    category,
    stock,
    price
  }

  logger.debug(`Body received: ${JSON.stringify(product)}`)

  // Validate each field
  for (const field in product) {
    const value = product[field]

    const isValid =
      (typeof value === 'string' && value.trim().length > 0) ||
      (typeof value === 'number' && !isNaN(value))

    if (!isValid) {
      const response = {
        status: 'error',
        message: `Invalid field '${field}'`
      }

      logger.warn(`Responded with 400: ${JSON.stringify(response)}`)

      return res.status(400).json(response)
    }
  }

  logger.info(`Product middleware passed`)
  next()
}
