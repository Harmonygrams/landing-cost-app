const { model, Schema } = require('mongoose')
const expenseSchema = Schema({
    name : {type : String, required : true},
    type : {type : String, required : true}, 
    description : {type : String}
})
const Expense = model('Expense', expenseSchema)
module.exports = Expense