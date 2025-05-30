import winston from 'winston'
import path from 'path'
import environment from '../environment/environment.js'

// Setup
const transports = []
const logDir = path.join(process.cwd(), 'logs')

// Logs formats
const fileFormat = winston.format.combine(
  winston.format.timestamp(),
  winston.format.json()
)

const consoleFormat = winston.format.combine(
  winston.format.colorize(),
  winston.format.simple()
)

// Local transport (full and reduced)
const useFiles = () =>
  transports.push(
    new winston.transports.File({
      filename: path.join(logDir, 'full.log'),
      level: 'debug',
      handleExceptions: true,
      format: fileFormat
    }),

    new winston.transports.File({
      filename: path.join(logDir, 'reduced.log'),
      level: 'info',
      handleExceptions: true,
      format: fileFormat
    })
  )

// Production transport (full)
const useConsole = () =>
  transports.push(
    new winston.transports.Console({
      level: 'debug',
      handleExceptions: true,
      format: consoleFormat
    })
  )

// Select environment
const isLocal = environment.ENVIRONMENT_URL.includes('localhost')
isLocal ? useFiles() : useConsole()

const logger = winston.createLogger({
  level: 'debug',
  transports,
  exitOnError: false
})

export default logger
