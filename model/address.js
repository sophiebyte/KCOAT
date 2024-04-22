const Sequelize = require('sequelize');
const { sequelize } = require("../config/connection.js");
const {User} = require('../model/signup')

const Address = sequelize.define('address', {
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
    phone: {
        type: Sequelize.STRING,
        allowNull: false
    },
    additionalPhone: {
        type: Sequelize.STRING,
        allowNull: true
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
    deliveryAddress: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
        }
    },
    additionalInformation: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    state: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
        }
    },
    city: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
        }
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
Address.associate = function(models) {
    // Associate Customer with User model
    Address.belongsTo(models.User, { foreignKey: 'userId' });
};

Address.sync().then((rs) => {
    console.log(rs)
}).catch((err) => {
    console.log(err)
})

module.exports = { Address };
