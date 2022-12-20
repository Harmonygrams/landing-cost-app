const Expense = require('../model/expense.model')
const fetchExpensesCount = (req, res, next) => {
    Expense.find({}).count().
    then(response => res.status(200).json({ 'success' : true, data : response})). 
    catch(err => res.status(200).json({ 'success' : false, msg : err}))

}
module.exports = fetchExpensesCount