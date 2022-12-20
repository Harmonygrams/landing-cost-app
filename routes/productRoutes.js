const router = require('express').Router() 
const addProduct = require('../utils/addProduct')
const fetchProducts = require('../utils/fetchProducts')
const fetchProductsCount = require('../utils/fetchProductsCount')
router.
    get('/product-count', fetchProductsCount).
    post('/fetch',fetchProducts).
    post('/add',addProduct)

module.exports = router