const Sequelize = require('sequelize');
const {sequelize} = require ("../config/connection.js");

const User = sequelize.define('UserTable',{
    id:{
        type:Sequelize.UUID,  
        defaultValue:Sequelize.UUIDV4,
        allowNull:false,
        primaryKey:true
    },
    username:{
        type:Sequelize.STRING,
        allowNull:false,
    },
    email:{
        type:Sequelize.STRING,
        allowNull:false,
        unique:true,
        validate: {
            notEmpty: true,
            isEmail: true // Validate email format
          }
    },
    password:{
        type:Sequelize.STRING,
        allowNull:false
    }
})

User.sync().then((rs)=>{
    console.log(rs)
}).catch((err)=>{
console.log(err)
})

module.exports = {User}