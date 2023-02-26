class ApiError extends Error {
  constructor(status, data) {
    super()
    this.status = status
    this.data = data
  }

  static badRequest(data) {
    return new ApiError(404, data)
  }

  static internal(data) {
    return new ApiError(500, data)
  }

  static forbidden(data) {
    return new ApiError(403, data)
  }
}

module.exports = ApiError
