const JWT = require('jsonwebtoken')
const { User } = require('../model/signup')
const {customer} = require('../model/customer')
const {Address} = require('../model/address')
const bcrypt = require('bcrypt');
const bcSaltRounds = 10
const secret = "KCOAT";


module.exports = {

    //add a user
    async addUser(req, res,) {
        const customer = {
            username: req.body.username,
            password: req.body.password,
            email: req.body.email
        }

        const hashedPassword = bcrypt.hashSync(customer.password, bcSaltRounds);

        User.findOne({ where: { email: customer.email }, paranoid: false })
            .then(find => {
                if (find) {
                    throw new Error('Email is already in use', 409);
                }
                return User.create({
                    username: customer.username,
                    email: customer.email,
                    password: hashedPassword
                })
            })
            .then(rs => {
                if (rs) {
                    console.log('Signup successful')
                    return res.status(200).json({rs, msg: "New registration added." });
                } else {
                    res.status(500).json({ success: false });
                }
            })
            .catch(error => {
                console.log(error)
                res.status(500).json({ error: 'Internal server error' });
            })
    },
    async addDetails(req, res) {
        const details = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            gender: req.body.gender,
            dateOfBirth: req.body.dateOfBirth,
            phone: req.body.phone,
            userId: null // Changed to userId
        };
    
        try {
            const user = await User.findOne({ where: { email: details.email }, paranoid: false });
    
            if (user) {
                // If user found, set the userId in the details object
                console.log(user)
                details.userId = user.id;
    
                // Create a new customer record with associated userId
                const result = await customer.create(details);
    console.log(result)
                console.log('Personal details added successfully');
                return res.status(200).json({ result, msg: "Details added." });
            } else {
                // Handle case where user is not found
                throw new Error('User not found');
            }
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: 'Internal server error' });
        }
    },
    async addAddress(req, res) {
        const details = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            phone: req.body.phone,
            additionalPhone: req.body.additionalPhone,
            email: req.body.email,
            deliveryAddress: req.body.deliveryAddress,
            additionalInformation: req.body.additionalInformation,
            state: req.body.state,
            city: req.body.city,
            userId: null 
        };
    
        try {
            const user = await User.findOne({ where: { email: details.email }, paranoid: false });
    
            if (user) {
                // If user found, set the userId in the details object
                details.userId = user.id;
    
                // Create a new customer record with associated userId
                const result = await Address.create(details);
    
                console.log('Address added successfully');
                return res.status(200).json({ result, msg: "Address added." });
            } else {
                // Handle case where user is not found
                throw new Error('User not found');
            }
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: 'Internal server error' });
        }
    },
    

    async login(req, res) {
        try {
            // Extract email/username and password from the request body
            const customer = {
                password: req.body.password,
                email: req.body.email
            }
            // Find user by email or username
            const user = await User.findOne({ where:{email : customer.email} })
            //console.log({message:user})
            // Check if user exists
            if (!user) {
                console.log('incorrect email or password')
                return res.status(401).json({ success: false, error: 'Invalid email or password' });
            }
            //console.log('Database Password:', user.password);
            // Compare passwords
           const passwordMatch = bcrypt.compareSync(customer.password, user.password);
           /*console.log('Password Match:', passwordMatch);
           console.log(customer.password)
           console.log(user.password)*/

            // If passwords match, generate JWT token
            if (passwordMatch) {
                // Generate JWT token
                const token = JWT.sign(customer.email, secret);
                // Send login success response with JWT token
                return res.status(200).json({ success: true, message: 'login successful', token });
            } else {
                return res.status (400).json("invalid")
            }
        } catch (error) {
            console.error(error);
            return res.status(500).json({ success: false, error: 'Internal server error' });
        }
    },
    
    async resetPassword(req, res) {
        try {
            const customer = {
                password: req.body.password,
                email: req.body.email
            };
            console.log("Requested email:", customer.email);
            const user = await User.findOne({ where: { email: customer.email } });
            if (user) {
                var hash = bcrypt.hashSync(customer.password, bcSaltRounds);

                await User.update({ password: hash }, { where: { email: customer.email } });
    
                return res.status(200).json({ success:  "password changed successfully"});
            } else {
                console.log("User not found");
                return res.status(404).json({ errors: ['Invalid Email!'] });
            }
        } catch (err) {
            console.error(err);
            return res.status(500).json({ errors: ['Error Updating Password!'] });
        }
    },
    
    //delete a User
    async deleteCustomer(req, res) {
        try {
           await User.findOne({ where: { email:(req.body.email)} })
            .then(user => {
                if (!user) {
                    throw new Error('Customer is not found')
                }else{
                    return User.destroy({ where: {email:req.body.email} })
                }  
            })
            .then(re => {
                return res.status(200).json({re ,msg:'success','status': "deleted Customer Successfully" });
            }).catch(err => {
            })
        }
        catch (err) {
            throw new Error('Error');
        }
    },

    //update existing user
    //Api customer update 
    async getCustomerUpdate(req, res) {
        try {
            const customer = {
            id: req.body.id,
         username : req.body.username,
          email : req.body.email };

            const user = await User.findOne({ where: { id: customer.id } })
           
            if (user) {
                await User.update({ username: customer.username, email: customer.email }, { where: { id: user.id } });
                return res.status(200).json({ message: "User update Successful" });
            } else {
                throw new Error('Customer is not found');
            }
        } catch (err) {
            console.error(err);
            return res.status(500).json({ error: 'Error updating user' });
        }
        
    },
    

     //find a user
     async findUser(req, res) {
        try {
            // Extract email parameter from the request
            const checkEmail = {
                email: req.query.email
            }

            // Check if email parameter is undefined
            if (!checkEmail.email) {
                return res.status(400).json({ success: false, error: 'Email parameter is required' });
            }

            // Find user by email
            const user = await User.findOne({
                where: { email: checkEmail.email }, paranoid: false
            });

            // Check if user is found
            if (user) {
                return res.status(200).json({ success: true, data: user });
            } else {
                return res.status(404).json({ success: false, error: 'User not found' });
            }
        } catch (error) {
            console.error(error);
            return res.status(500).json({ success: false, error: 'Internal server error' });
        }
    },

     // fine all user
     async getAllUsers(req, res) {
        try {
            const users = await User.findAll();
            if (users.length > 0) {
                return res.status(200).json({ success: true, data: users });
            } else {
                return res.status(500).json({ success: false, message: 'Cannot retrieve all users' });
            }
        } catch (err) {
            console.log(err);
            return res.status(500).json({ success: false, message: 'Internal Server Error' });
        }
    },
};


