const express = require("express")
const app = express()
const cors = require('cors')
const {router} = require ("./routes/rts")
const bodyParser = require('body-parser')
//const bcrypt = require('bcryptjs')


app.use(cors());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))


const PORT = 5000

//welcome page
app.use('/',router)

app.listen(PORT,()=> {
    console.log("server running")
})