const express = require("express")
const app = express()
const cors = require('cors')
const {router} = require ("./routes/rts")
const bodyParser = require('body-parser')
//const bcrypt = require('bcryptjs')


app.use(cors());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    next();
});

const PORT = 3000

//welcome page
app.use('/',router)

app.listen(PORT,()=> {
    console.log("server running")
})