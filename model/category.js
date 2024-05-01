const Sequelize = require('sequelize');
const {sequelize} = require ("../config/connection.js");
//const {Product} = require('./products')

const productCategory = sequelize.define('Category',{
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      description: {
        type: Sequelize.STRING,
        allowNull: false
      }
})
// productCategory.associate = function(models) {
//   // Associate Customer with User model
//   productCategory.belongsTo(models.Product, { foreignKey: 'categoryId' });
// };

productCategory.sync({ alter: true })
.then((rs)=>{
    console.log(rs)
}).catch((err)=>{
console.log(err)
})

module.exports = {productCategory}