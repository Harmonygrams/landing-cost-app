const Product = require('../model/product.model')
const formidable = require('formidable') 
const fetchProducts = (req, res, next) => {
    const form = formidable({multiples : true})
    form.parse(req, (err, fields, files) => {
        if(err) res.status(500).json({success : false, msg : err})
        if(fields){
            const {query} = fields
            const queryRegularExpression = new RegExp(query)
            Product.find({
                name : {$regex : queryRegularExpression, $options : 'ig'}
            }). 
            then(response => res.status(200).json({ success : true, data : response})).
            catch(err => res.status(404).json({success : false, data : err}))
        }
    })
}
module.exports = fetchProducts