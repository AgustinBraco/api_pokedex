import bcrypt from 'bcryptjs'

export const encryptPassword = async password => await bcrypt.hash(password, 10)

export const verifyPassword = async (password, encryptedPassword) =>
  await bcrypt.compare(password, encryptedPassword)

export const isEncrypted = password =>
  typeof password === 'string' &&
  password.startsWith('$2') &&
  password.length === 60
