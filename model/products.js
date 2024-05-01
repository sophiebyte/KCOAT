const Sequelize = require('sequelize');
const {sequelize} = require ("../config/connection.js");
//const {productCategory} = require ("./category.js")

const Product = sequelize.define('product',{
    id:{
        type:Sequelize.UUID,  
        defaultValue:Sequelize.UUIDV4,
        allowNull:false,
        primaryKey:true
    },
    name:{
        type:Sequelize.STRING,
        allowNull:false,
    },
    category:{
        type:Sequelize.STRING,
        allowNull:false
    },
    tag:{
        type:Sequelize.STRING,
        allowNull:true
    },
    brand:{
        type:Sequelize.STRING,
        allowNull:true
    },
    description:{
        type:Sequelize.STRING,
        allowNull:true
    },
    imageurl:{
        type:Sequelize.STRING,
        allowNull:false
    },
    price:{
        type:Sequelize.DOUBLE,
        allowNull:false
    },
    size:{
        type:Sequelize.STRING,
        allowNull:true
    },
   colour:{
        type:Sequelize.STRING,
        allowNull:true
    },
    quantity:{
        type:Sequelize.STRING,
        allowNull:true
    },
    SKU:{
        type:Sequelize.STRING,
        allowNull:true
    },
})

// Product.associate = function(models) {
//     // Associate Customer with User model
//     Product.belongsTo(models.productCategory, { foreignKey: 'categoryId' });
// };

Product.sync({ alter: true }).then((rs)=>{
    console.log(rs)
}).catch((err)=>{
console.log(err)
})

module.exports = {Product}