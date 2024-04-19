const express = require("express")
const app = express()
const {router} = require ("./routes/rts")
const cors = require('cors')
const bodyParser = require('body-parser')
//const bcrypt = require('bcryptjs')


app.use(cors());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))


const PORT = 3000

//welcome page
app.use('/',router)

app.listen(PORT,()=> {
    console.log("server running")
})