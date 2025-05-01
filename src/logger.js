import winston from 'winston'
import path from 'path'
import environment from './environment/environment.js'

// Setup
const transports = []
const logDir = path.join(process.cwd(), 'logs')
const isLocal = environment.ORIGIN_URL.includes('localhost')

if (isLocal) {
  transports.push(
    // Local - Full
    new winston.transports.File({
      filename: path.join(logDir, 'full.log'),
      level: 'debug',
      handleExceptions: true,
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
      )
    }),

    // Local - Reduced
    new winston.transports.File({
      filename: path.join(logDir, 'reduced.log'),
      level: 'info',
      handleExceptions: true,
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
      )
    })
  )
} else {
  // Production - Full
  transports.push(
    new winston.transports.Console({
      level: 'debug',
      handleExceptions: true,
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      )
    })
  )
}

const logger = winston.createLogger({
  level: 'debug',
  transports,
  exitOnError: false
})

export default logger
