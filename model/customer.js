const Sequelize = require('sequelize');
const {sequelize} = require ("../config/connection.js");

const Customer = sequelize.define('Customer',{
id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  },
  firstName: {
    type: Sequelize.STRING
  },
  lastName: {
    type: Sequelize.STRING
  },
  phone: {
    type: Sequelize.STRING
  },
  email: {
    type: Sequelize.STRING
  },
  password: {
    type: Sequelize.STRING
  },
  userid: {
    type: Sequelize.STRING
  },
  gender: {
    type: Sequelize.STRING
  }
})

Customer.sync().then((rs)=>{
    console.log(rs)
}).catch((err)=>{
console.log(err)
})

module.exports = {Customer}