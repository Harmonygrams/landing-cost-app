const Product = require('../model/product.model')
const fetchProductsCount = (req, res, next) => {
    Product.find({}).count().
    then(response => res.status(200).json({'success' : true, data : response})). 
    catch(err => res.status(500).json({'success' : false, msg : err}))
}
module.exports = fetchProductsCount