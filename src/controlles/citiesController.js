const cities = require('../models/cities')
const haversine = require('haversine-distance')
const ApiError = require('../error/ApiError')

const slowDown = milliseconds => {
  const date = Date.now()
  let currentDate = null
  do {
    currentDate = Date.now()
  } while (currentDate - date < milliseconds)
}

class CitiesController {
  async getListOfCities(req, res, next) {
    const { string } = req.query

    if (!!string) {
      return next(ApiError.badRequest({ message: 'string is not provided' }))
    }

    if (string.toLocaleLowerCase() === 'fail') {
      return next(ApiError.badRequest({ message: 'fail is not allowed' }))
    }

    if (string === '') {
      res.json({ result: [] })
      return
    }

    const filtrated = cities.filter(item => item[0].includes(string))
    res.json({ result: filtrated })
  }

  calcDistance(req, res, next) {
    let { data } = req.body
    const notInModel = []

    data.forEach(item => {
      const isCity = cities.find(item2 => item2[0] === item[0])
      if (!isCity) {
        notInModel.push(item)
      }
    })

    if (data.find(item => item[0].toLocaleLowerCase() === 'dijon')) {
      return next(ApiError.badRequest({ message: 'Dijon is not allowed' }))
    }
    if (data.find(item => item[0].toLocaleLowerCase() === 'fail')) {
      return next(ApiError.badRequest({ message: 'Fail is not allowed' }))
    }
    if (notInModel.length > 0) {
      const message =
        notInModel.map(item => item[0]).join(',') + ' - not in the model'
      return next(ApiError.badRequest({ message, data: notInModel }))
    }

    let result = {}

    for (let i = 0; i < data.length - 1; i++) {
      const current = cities.find(item => item[0] === data[i][0])
      const next = cities.find(item => item[0] === data[i + 1][0])
      const name = i === 0 ? current[0] + '-and-' + next[0] : next[0]

      const a = { lat: current[1], lng: current[2] }
      const b = { lat: next[1], lng: next[2] }
      const distance = haversine(a, b)
      result = { ...result, [name]: distance }
    }

    res.send({ result: result })
  }
}

module.exports = new CitiesController()
