const express = require("express");
const router = express.Router();
const {addUser,findUser,login,getAllUsers,resetPassword,
    deleteCustomer,getCustomerUpdate,addDetails,addAddress} = require ('../controllers/signupcontrollers');


//welcome page
router.get('/',(req,res)=> {
    res.json({
        status: true,
        message: "welcome to KCOAT"
    });
});

router.post('/register',addUser);
router.get('/UserByEmail',findUser);
router.post('/UserLogin',login)
router.post('/PersonalDetails',addDetails)
router.post('/addAddress',addAddress)
router.get('/getallusers',getAllUsers)
router.post('/changePassword',resetPassword)
router.put('/updateUser',getCustomerUpdate)
router.delete('/deleteUser',deleteCustomer)

module.exports = {router}