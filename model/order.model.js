const { model, Schema } = require('mongoose')
const orderSchema = Schema({
    currency : {type : Object, default : {}, required : true}, 
    totalExpensesOnOtherItems : {type : Number, required : true}, 
    commission : {type : Number, required : true},
    isActive : {type : Boolean, default :true, required : true},
    itemsPurchasedArray : {type : Array, required : true}, 
    otherExpensesArray : {type : Array, required : true},
    date : {type : Date, default : new Date(), required : true}, 
    landingAmountTotal : { type : Number}, 
    landingCostTotal : { type : Number}
})
const Order = model('Order', orderSchema) 
module.exports = Order