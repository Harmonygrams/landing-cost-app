const router = require('express').Router()
const saveOrder = require('../utils/saveOrder')
const fetchOrdersCount = require('../utils/fetchOrdersCount')
const fetchOrders = require('../utils/fetchOrders')
router.
    get('/order-count', fetchOrdersCount).
    post('/fetch-orders', fetchOrders).
    post('/add-order', saveOrder)
module.exports = router