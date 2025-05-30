import dotenv from 'dotenv'

dotenv.config()

const environment = {
  PORT: process.env.PORT || 5000,
  ORIGIN_URL: process.env.ORIGIN_URL.split(',').map(url => url.trim()),
  ENVIRONMENT_URL: process.env.ENVIRONMENT_URL,
  JWT_SECRET: process.env.JWT_SECRET,
  ADMIN_EMAIL: process.env.ADMIN_EMAIL,
  ADMIN_PASSWORD: process.env.ADMIN_PASSWORD,
  ADMIN_KEY: process.env.ADMIN_KEY,
  ADMIN_ROLE: process.env.ADMIN_ROLE
}

export default environment
