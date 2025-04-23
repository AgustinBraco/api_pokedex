import dotenv from 'dotenv'

dotenv.config()

const environment = {
  PORT: process.env.PORT || 5000,
  ORIGIN_URL: process.env.ORIGIN_URL,
  JWT_SECRET: process.env.JWT_SECRET,
  USER_EMAIL: process.env.USER_EMAIL,
  USER_PASSWORD: process.env.USER_PASSWORD,
  ADMIN_EMAIL: process.env.ADMIN_EMAIL,
  ADMIN_PASSWORD: process.env.ADMIN_PASSWORD,
  ADMIN_KEY: process.env.ADMIN_KEY,
  ADMIN_ROLE: process.env.ADMIN_ROLE,
  DB_USER: process.env.DB_USER,
  DB_PASSWORD: process.env.DB_PASSWORD
}

export default environment
