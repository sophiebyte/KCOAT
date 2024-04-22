const JWT = require('jsonwebtoken')
const {Admin} = require('../model/admin')
const bcrypt = require('bcrypt')
const bcSalt = 10
const secret = "KCOAT";

module.exports = {
    async AdminSignup(req, res) {
       const details = {
            username: req.body.username,
            password: req.body.password,
            email: req.body.email,
            fullName: req.body.fullName, 
            role: req.body.role
        }
        
        console.log(details)

         const hashedPassword = await bcrypt.hashSync(details.password, bcSalt);
        console.log(details)
        console.log(hashedPassword)

        try {
            const adminExists = await Admin.findOne({ where:{email:details.email}, paranoid: false });
            //if (!adminExists) {
                //return res.status(400).json({ error: 'Email is required' });}
            if (adminExists) {
                throw new Error('Email is already in use', 409);
            }

            const newAdmin = await Admin.create({
                username: details.username,
                password: hashedPassword,
                email: details.email,
                fullName: details.fullName, 
                role: details.role
            });

            console.log('Admin Signup successful');
            return res.status(200).json({ admin: newAdmin, msg: "New Admin signed up." });
        } catch (error) {
            console.log(error)
            res.status(500).json({ error: 'Internal server error' });
        }
    },

    async AdminLogin(req, res) {
        try {
            const details = {
                password: req.body.password,
                email: req.body.email
            }
            const user = await Admin.findOne({ where:{email : details.email} })
            if (!user) {
                console.log('incorrect email or password')
                return res.status(401).json({ success: false, error: 'Invalid email or password' });
            }
            
            // Compare passwords
           const passwordMatch = bcrypt.compareSync(details.password, user.password);

            // If passwords match, generate JWT token
            if (passwordMatch) {
                const token = JWT.sign(details.email, secret);
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
}