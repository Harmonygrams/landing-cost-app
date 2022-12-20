const Order = require('../model/order.model')
const fetchOrdersCount = (req, res, next) => {
    Order.find({}).count(). 
    then(response => res.status(200).json({ 'success' : true, 'data' : response})). 
    catch(err => res.status(200).json({ 'success' : false, msg : err}))
}
module.exports = fetchOrdersCount