const express = require('express') 
const cors = require('cors')
const router = require('./routes/index')
require('dotenv').config()
require('./utils/connectDb')()
const PORT = process.env.PORT || 5001
const app = express() 
//middleware 
app.use(cors())
app.use(express.json())
app.use(router)
app.listen(PORT, () => {
    console.log('server is listening to ', PORT)
})
