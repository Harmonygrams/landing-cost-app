const mongoose = require('mongoose')
require('dotenv').config()
const MONGO_URI = process.env.MONGO_URI
const connectDb = async () => {
    try{
        await mongoose.connect(MONGO_URI,{
        }, (err) => {
            if(err) {
                console.log("connection to database failed")
                return
            }
            console.log('connection to database sucessful')
            require('../utils/databaseConfiguration')()
        })
    }catch(err){
        console.log("An error occurred. It couldn't connect")
    }


}
module.exports = connectDb