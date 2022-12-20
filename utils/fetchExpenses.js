const Expense = require('../model/expense.model')
const fetchExpenses = (req, res, next) => {
    Expense.find({}). 
    then(response => res.status(200).json({'success' :true, data : response})). 
    catch(err => {
        res.status(404).json({'success' : false, msg : err})
    })
}
module.exports = fetchExpenses