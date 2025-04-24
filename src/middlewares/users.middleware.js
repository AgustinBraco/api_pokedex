export const isValidUser = async (req, res, next) => {
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

  // Validate each field
  for (const field in user)
    if (user[field].length <= 0 || typeof user[field] !== 'string')
      return res.status(400).json({
        status: 'error',
        message: `Invalid field ${field}`
      })

  next()
}
