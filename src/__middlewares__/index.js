const responseMiddleware = require('./responseMiddleware')
const errorMiddleware = require('./errorMiddleware')
const notFoundMiddleware = require('./notFoundMiddleware')
const authorizationMiddleware = require('./authorizationMiddleware')

module.exports = {
  authorizationMiddleware,
  responseMiddleware,
  errorMiddleware,
  notFoundMiddleware,
}