const express = require("express");
const router = express.Router();
const { addUser, findUser, login, getAllUsers, resetPassword,
    deleteCustomer, getCustomerUpdate, addDetails, addAddress} = require('../controllers/signupcontrollers');
const { AdminSignup,AdminLogin } = require('../controllers/admincontrollers')
const {AddNewCategory, updateCategory }= require('../controllers/categorycontrollers')
const {AddProduct,productUpdateByName,productDelete,filterProducts}= require('../controllers/productscontrollers')


//welcome page
router.get('/', (req, res) => {
    res.json({
        status: true,
        message: "welcome to KCOAT"
    });
});

router.post('/register', addUser);
router.post('/AdminRegister', AdminSignup);
router.get('/UserByEmail', findUser);
router.post('/UserLogin', login)
router.post('/AdminLogin', AdminLogin)
router.post('/PersonalDetails', addDetails)
router.post('/addAddress', addAddress)
router.get('/getallusers', getAllUsers)
router.post('/changePassword', resetPassword)
router.put('/updateUser', getCustomerUpdate)
router.delete('/deleteUser', deleteCustomer)

router.post('/NewCategory', AddNewCategory)
router.post('/UpdateCategory', updateCategory)

router.post('/NewProduct', AddProduct)
router.put('/updateProductByName',productUpdateByName)
router.delete('/deleteProduct', productDelete)
router.get('/filterProduct',filterProducts)

module.exports = { router }