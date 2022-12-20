const Setting = require('../model/settings.model')
const fetchDefaultCurrencies = (req, res, next) => {
    Setting.findOne({}). 
    then(response => res.status(200).json({ 'success' : true, data : response})). 
    catch(err => res.status(203).json({'success' : false, err : err}))
}
module.exports = fetchDefaultCurrencies