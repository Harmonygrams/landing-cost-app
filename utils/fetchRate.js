const Settings = require('../model/settings.model')
const fetchRate = (req, res, next) => {
    Settings.findOne({}, {
        _id : 0, 
        rate : 1, 
        primaryCurrency : 1, 
        secondaryCurrency : 1
    }). 
    then(response => res.status(200).json({ success : true, data : response})). 
    catch(err => res.staus(500).json({'success' : false, msg : err}))
}
module.exports = fetchRate