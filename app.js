const path = require('path')
const express = require("express")
const app = express()
const cors = require('cors')
const rootDir = require('./config/path');
const {router} = require ("./routes/rts")
const bodyParser = require('body-parser')
const PORT = 5000
//const bcrypt = require('bcryptjs')


app.use(cors());
app.use(express.json())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.set('view engine', 'ejs');
app.set('views', 'views');

//welcome page
app.use('/',router)

app.listen(PORT,()=> {
    console.log("server running")
})