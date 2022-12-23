const router = require('express').Router()
const saveOrder = require('../utils/saveOrder')
const fetchOrdersCount = require('../utils/fetchOrdersCount')
const fetchOrders = require('../utils/fetchOrders')
const toggleOrderState = require('../utils/toggleOrderState')
router.
    get('/order-count', fetchOrdersCount).
    post('/fetch-orders', fetchOrders).
    post('/add-order', saveOrder). 
    put('/update-order', toggleOrderState)
module.exports = router