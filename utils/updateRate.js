const Settings = require('../model/settings.model')
const formidable = require('formidable')
const updateRate = (req, res, next) => {
    const form = formidable({multiples : true})
    form.parse(req, (err, fields, files) => {
        if(err) return res.json(403).json({'success' : false, msg : err})    
        const {rate} = fields
        if(rate){
            Settings.findOneAndUpdate({name : 'settings'}, {$set : {'rate' : rate}}). 
            then(response => res.status(200).json({'success' : true, data : response})).
            catch(err => { res.status(403).json({ 'success' : false, "msg" : err })})
        }
    })
}
module.exports = updateRate