const Order = require('../model/order.model')
const formidable = require('formidable') 
const form = formidable({multiples : true})
const fetchOrders = (req, res, next) => {
    form.parse(req, (err, fields, files) => {
        if(err) return res.status(403).json({'success' : false, msg : err})
        const { id } = fields
        if(id){
            //query the database using the id of the item
            Order.findById(id). 
            then(response => res.status(200).json({ 'success' : true, data : response})). 
            catch(err => console.log(err))
            return 
        }
        Order.find({}). 
        then(response => res.status(200).json({ 'success' : true, data : response})). 
        catch(err => console.log(err))
    })
}
module.exports = fetchOrders