const express = require('express')
const router = express.Router()
const citiesController = require('../controlles/citiesController')

router.get('/getListOfCities', citiesController.getListOfCities)
router.post('/calcDistance', citiesController.calcDistance)

module.exports = router
