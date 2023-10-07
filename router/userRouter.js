const express = require("express");
require("dotenv").config();
const {UserModel } = require("../model/usermodel"); // Assuming UserModel is your Mongoose model for users
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userRouter = express.Router();

/* User Registration Endpoint */
userRouter.post('/register', async (req, res) => {
    const { username, email, password } = req.body;

    try {
        // Validate if all required fields are provided
        if (!email || !username || !password) {
            return res.status(401).send({ error: 'Please provide all the fields' });
        }

        // Check if email is already taken
        const existingEmail = await UserModel.findOne({ email });

        if (existingEmail) {
            return res.status(203).send({ message: 'This Email or Username is already taken.' });
        }

        // Hash the password before saving it to the database
        const hash = await bcrypt.hash(password, 10); // 10 is the number of salt rounds

        // Save the user with the hashed password to the database
        const user = new UserModel({ username, email, password: hash });
        await user.save();

        res.send('User has been Registered');
    } catch (err) {
        console.error('Error during registration:', err);
        res.status(500).send({ msg: 'User not registered', error: err.message });
    }
});


/* User Login Endpoint */
userRouter.post("/login", async (req, res) => {
    let { email, password } = req.body;

    try {
        // Check if the user with the provided email exists in the database
        const user = await UserModel.findOne({ email });

        if (user) {
            // Compare the provided password with the stored hashed password
            bcrypt.compare(password, user.password, (err, result) => {
                if (err || !result) {
                    return res.status(401).send({ error: 'Invalid Credentials' });
                } else {
                    // Generate a JSON Web Token (JWT) for authentication
                    let token = jwt.sign({ userID: user._id }, process.env.secretkey);
                    return res.status(200).send({ "msg": "LoggedIn Successfully", "token": token });
                }
            });
        } else {
            // If user does not exist, send a message indicating wrong credentials
            res.send({ "msg": "Wrong Credentials" });
        }
    } catch (error) {
        // Handle other errors that might occur during the login process
        res.send({ "msg": "Something Went Wrong", "error": error.message });
    }
});

module.exports = {
    userRouter
};
