const { Schema, model } = require('mongoose') 
const settingSchema = Schema({
    _id : {type : String, trim : true, default : 'settings'},
    primaryCurrency : {type : Object, trim : true, default : {"name" : 'United State Dollars', "code" : "USD", "symbol" : "$"}},
    secondaryCurrency : {type : Object, trim : true, default : {"name" : "Nigerian Naira", "code" : "NGN", "symbol" : "₦"}}, 
    rate : {type : String, trim : true, default : '0.00'}
})
const Settings = model('Settings', settingSchema) 
module.exports = Settings