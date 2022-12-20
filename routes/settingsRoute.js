const router = require('express').Router() 
const updateCurrency = require('../utils/updateCurrency')
const fetchDefaultCurrencies = require('../utils/fetchDefaultCurrencies')
const fetchRate = require('../utils/fetchRate')
const updateRate = require('../utils/updateRate')
router.
    get('/fetch-default-currencies', fetchDefaultCurrencies).
    get('/fetch-rate', fetchRate).
    put('/currency-update', updateCurrency). 
    put('/rate-update', updateRate)

module.exports = router