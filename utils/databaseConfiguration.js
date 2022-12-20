const Settings = require('../model/settings.model')
const databaseConfiguration = () => {
    const dbConfig = new Settings({})
    Settings.findOne({}).
    then(response => {
        if(response === null){
           dbConfig.save()
           console.log('Database configured successfully') 
           return
        }
        console.log('Database already configured')
    }).
    catch(err => console.log(err))
}
module.exports = databaseConfiguration