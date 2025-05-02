import winston from 'winston'
import path from 'path'
import environment from '../environment/environment.js'

// Setup
const transports = []
const logDir = path.join(process.cwd(), 'logs')

// Logs format
const customFormat = winston.format.combine(
  winston.format.timestamp(),
  winston.format.json()
)

// Local (full and reduced)
const useFiles = () =>
  transports.push(
    new winston.transports.File({
      filename: path.join(logDir, 'full.log'),
      level: 'debug',
      handleExceptions: true,
      format: customFormat
    }),

    new winston.transports.File({
      filename: path.join(logDir, 'reduced.log'),
      level: 'info',
      handleExceptions: true,
      format: customFormat
    })
  )

// Production (full)
const useConsole = () =>
  transports.push(
    new winston.transports.Console({
      level: 'debug',
      handleExceptions: true,
      format: customFormat
    })
  )

// Select environment
const isLocal = environment.ORIGIN_URL.includes('localhost')
isLocal ? useFiles() : useConsole()

const logger = winston.createLogger({
  level: 'debug',
  transports,
  exitOnError: false
})

export default logger
