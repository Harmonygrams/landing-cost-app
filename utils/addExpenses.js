const formidable = require('formidable')
const Expense = require('../model/expense.model')
const addExpense = (req, res, next) => {
    const form = formidable({multiples : true})
    form.parse(req, async (err, fields, files) => {
        if(err) return res.status(400).json({ success : false, msg : err}) 
        const {name , type, description} = fields
        const newExpense = Expense({
            name, 
            type, 
            description
        })
        try {
            await newExpense.save()
            res.status(200).json({ success : true, msg : 'Expense saved successfully'})
        }catch(err){
            res.status(500).json({success : false, msg : err})
        }
    })
}
module.exports = addExpense