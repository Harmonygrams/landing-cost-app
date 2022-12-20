const Settings = require('../model/settings.model')
const formidable = require('formidable') 
const updateCurrency = (req, res, next) => {
    const form = formidable({mutiples : true})
    form.parse(req, (err, fields, file) => {
        if(err) return res.status(403).json({'success' : false, msg : err})
        const {primaryCurrency, secondaryCurrency} = fields
        if(primaryCurrency && secondaryCurrency){
            Settings.updateOne({ _id : 'settings'}, 
            [
                {$set : { primaryCurrency : { name : primaryCurrency.name, code : primaryCurrency.code, symbol : primaryCurrency.symbol}}}, 
                {$set : { secondaryCurrency : { name : secondaryCurrency.name, code : secondaryCurrency.code, symbol : secondaryCurrency.symbol}}},
            ]).
            then(response => res.status(200).json({ success : true, msg : response})). 
            catch(err => res.status(500).json({ 'success' : false, msg : err}))
            return
        }
        res.status(403).json({'success' : false, msg : 'Invalid Request'})
    })
}
module.exports = updateCurrency