const Sequelize = require('sequelize');
const {sequelize} = require ("../config/connection.js");

const productCategory = sequelize.define('Category',{
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      description: {
        type: Sequelize.STRING,
        allowNull: false
      }
})

productCategory.sync().then((rs)=>{
    console.log(rs)
}).catch((err)=>{
console.log(err)
})

module.exports = {productCategory}