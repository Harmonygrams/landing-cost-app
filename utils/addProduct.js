const Product = require('../model/product.model')
const formidable = require('formidable')
const addProduct = (req, res, next) => {
    const form = formidable({multiples : true})
    form.parse(req, async (err, fields, files) => {
        if(err) return res.status(400).json({ 'success' : false, msg : err})
        const {name, description, duty, vat} = fields
        const newProduct = new Product({
            name, 
            description, 
            duty,
            vat 
        })
        try{
            await newProduct.save() 
            res.status(200).json({ 'success' : true, message : 'Produced saved successfully'})
        }
        catch(err){
            res.status(500).json({'success' : false, message : 'There was an error saving your product', error : err})
        }
    })
}
module.exports = addProduct