const Sequelize = require('sequelize') 
const sequelize = new Sequelize ("bfcwulj7l8amsea9oqmv", "uzeeakgy3d7wkazt", "UrJkKywjClmwfLXpwA4w",
{dialect:"mysql",host:"bfcwulj7l8amsea9oqmv-mysql.services.clever-cloud.com"});

sequelize.authenticate().then(()=>{
    console.log("connected")
}).catch(err=>{
    console.log(err)
})

module.exports = {sequelize}