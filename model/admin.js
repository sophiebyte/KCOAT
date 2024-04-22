const Sequelize = require('sequelize');
const { sequelize } = require("../config/connection.js");

const Admin = sequelize.define('Admin', {
    id:{
        type:Sequelize.UUID,  
        defaultValue:Sequelize.UUIDV4,
        allowNull:false,
        primaryKey:true
    },
    username: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
            notEmpty: true,
        }
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    fullName: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
        }
    },
    role: {
        type: Sequelize.ENUM('Admin','Rep','Manager'),
        allowNull: false,
        defaultValue: 'Admin', // Default role for admin users
        validate: {
            notEmpty: true,
        }
    }
});
Admin.sync().then((rs)=>{
    console.log(rs)
}).catch((err)=>{
console.log(err)
})

module.exports = {Admin};
