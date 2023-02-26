const ApiError = require('../error/ApiError')

module.exports = function (err, req, res, next) {
  if (err instanceof ApiError) {
    return res.status(err.status).json({ data: err.data })
  }

  return res.status(500).json({ data: { message: 'unexpected error' } })
}
