import bcrypt from 'bcryptjs'

export const encryptPassword = async password => await bcrypt.hash(password, 10)

export const verifyPassword = async (password, hashedPassword) =>
  await bcrypt.compare(password, hashedPassword)
