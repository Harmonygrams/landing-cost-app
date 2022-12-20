const router = require('express').Router()
const productRoutes = require('./productRoutes')
const expenseRoutes = require('./expenseRoutes')
const settingsRoute = require('./settingsRoute') 
const orderRouter = require('./OrderRoutes')
router.use('/product', productRoutes)
router.use('/expense', expenseRoutes)
router.use('/settings', settingsRoute)
router.use('/order', orderRouter)
module.exports = router