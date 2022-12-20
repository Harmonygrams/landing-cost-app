const {Schema, model} = require('mongoose')
const productSchema = Schema({
    name : {type : String, required : true},
    description : {type : String}, 
    duty : {type : String, trim : true, default : '0'}, 
    vat : {type : String, trim : true , default : '0'}
})
const Product = model('Product', productSchema)
module.exports = Product