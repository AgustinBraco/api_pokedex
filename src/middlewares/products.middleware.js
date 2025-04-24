export const isValidProduct = async (req, res, next) => {
  // Get info and create product
  const { name, category, stock, price } = req.body

  let product = {
    name,
    category,
    stock,
    price
  }

  // Validate each field
  for (const field in product) {
    const value = product[field]

    const isValid =
      (typeof value === 'string' && value.trim().length > 0) ||
      (typeof value === 'number' && !isNaN(value))

    if (!isValid)
      return res.status(400).json({
        status: 'error',
        message: `Invalid field ${field}`
      })
  }

  next()
}
