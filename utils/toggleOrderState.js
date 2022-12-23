const Order = require('../model/order.model')
const formidable = require('formidable') 
const form = formidable({
    multiples : true,
})
const toggleOrderState = (req, res, next) => {
    form.parse(req, (err, fields, files) => {
        if(err) return res.status(404).json({'success' : false, 'msg' : err}) 
        const { id } = fields
        if(id){
            Order.findByIdAndUpdate(id,{ isActive : !$isActive}).
            then(response => res.status(200).json({ success : true, msg : response})). 
            catch(err => res.status(404).json({ success : false, 'msg' : err}))
            return 
        }
        res.status(404).json({ success : false, 'msg' : 'Empty payload'})
    })
}
module.exports = toggleOrderState