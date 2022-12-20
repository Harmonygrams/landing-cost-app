const router = require('express').Router()
const addExpense = require('../utils/addExpenses')
const fetchExpenses = require('../utils/fetchExpenses')
const fetchExpensesCount = require('../utils/fetchExpensesCount')
router. 
    get('/expense-count', fetchExpensesCount).
    post('/fetch', fetchExpenses).
    post('/add', addExpense)

module.exports = router