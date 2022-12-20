const express = require('express') 
const cors = require('cors')
const router = require('./routes/index')
require('dotenv').config()
require('./utils/connectDb')()
const PORT = process.env.PORT 
const app = express() 
//middleware 
app.use(cors())
app.use(router)
app.use(express.json())
app.listen(PORT, () => {
    console.log('server is listening to ', PORT)
})