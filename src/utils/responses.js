import logger from '../logger/logger.js'

class Responses {
  // 200 - OK
  success(res, message, data) {
    const response = {
      status: 'success',
      message,
      data
    }

    logger.info(`Responded with 200: ${JSON.stringify(response)}`)
    return res.status(200).json(response)
  }

  // 400 - BAD REQUEST
  badRequest(res, message) {
    const response = {
      status: 'error',
      message
    }

    logger.warn(`Responded with 400: ${JSON.stringify(response)}`)
    return res.status(400).json(response)
  }

  // 401 - UNAUTHORIZED
  unauthorized(res, message) {
    const response = {
      status: 'error',
      message
    }

    logger.warn(`Responded with 401: ${JSON.stringify(response)}`)
    return res.status(401).json(response)
  }

  // 403 - FORBIDDEN
  forbidden(res, message) {
    const response = {
      status: 'error',
      message
    }

    logger.warn(`Responded with 403: ${JSON.stringify(response)}`)
    return res.status(403).json(response)
  }

  // 404 - NOT FOUND
  notFound(res, message) {
    const response = {
      status: 'error',
      message
    }

    logger.warn(`Responded with 404: ${JSON.stringify(response)}`)
    return res.status(404).json(response)
  }

  // 409 - CONFLICT
  conflict(res, message) {
    const response = {
      status: 'error',
      message
    }

    logger.warn(`Responded with 409: ${JSON.stringify(response)}`)
    return res.status(409).json(response)
  }

  // 500 - INTERNAL SERVER ERROR
  error(res, error) {
    const response = {
      status: 'error',
      message: 'Internal server error',
      error: `${error}`
    }

    logger.error(`Responded with 500: ${JSON.stringify(response)}`)
    return res.status(500).json(response)
  }
}

export default new Responses()