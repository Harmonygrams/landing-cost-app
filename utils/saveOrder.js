const Order = require('../model/order.model')
const formidable = require('formidable') 
const saveOrder = (req, res, next) => {
    const form = formidable({multiples : true})
    form.parse(req, async (err, fields, files) => {
        if(err) return res.status(200).json({ 'success' : false, msg : err}) 
        const {currency,otherExpensesArray, landingAmountTotal, landingCostTotal, totalExpensesOnOtherItems, commission, itemsPurchasedArray, datePurchased} = fields
        if(fields){
            const newOrder = new Order({
                currency,
                otherExpensesArray,
                totalExpensesOnOtherItems, 
                commission,
                itemsPurchasedArray, 
                datePurchased, 
                landingAmountTotal, 
                landingCostTotal 
            })
            //saving the new order in the database 
            try {
                newOrder.save()
                res.status(200).json({'success' : true, msg : 'Order saved successfully'})
            }catch(err){
                res.status(403).json({'success' : false, msg : err})
            }
        }
        else{
            res.status(500).json({'success' : false, msg : 'Unable to process request'})
        }
    })
}
module.exports = saveOrder