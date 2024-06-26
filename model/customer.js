const Sequelize = require('sequelize');
const { sequelize } = require("../config/connection.js");
const {User} = require('./signup.js');

const customer = sequelize.define('Customer', {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
    },
    firstName: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
            len: [1, 255]
        }
    },
    lastName: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
            len: [1, 255]
        }
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true, // Ensure email is unique
        validate: {
            notEmpty: true,
            isEmail: true // Validate email format
        }
    },
    gender: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
            isIn: [['male', 'female']] // Example: Limit gender to specific values
        }
    },
    dateOfBirth: {
        type: Sequelize.STRING,
        allowNull: true
    },
    phone: {
        type: Sequelize.STRING,
        allowNull: false
    },
    userId: {
        type:Sequelize.UUID,
        allowNull: false,
        references: {
            model: User, // Reference to the Signup model
            key: 'id' // The primary key in the Signup table
        }
    }
});

customer.associate = function(models) {
    // Associate Customer with User model
    customer.belongsTo(models.User, { foreignKey: 'userId' });
};

customer.sync().then((rs) => {
    console.log(rs)
}).catch((err) => {
    console.log(err)
})

module.exports = { customer }