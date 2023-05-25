const User = require('../Models/UserModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Function to render the auth page
const renderAuthPage = (req, res) => {
    res.render('auth');
};

// Function to handle user login
const loginUser = async (req, res, next) => {
    const user = await User.findOne({
        where: {
            mobileNumber: req.body.mobileNumber,
        }
    });

    if (!user) {
        res.status(404).json({ error : "User does not exist" });
    } else {
        const passwordValid = await bcrypt.compare(req.body.password, user.password);
        if (passwordValid) {
            const token = jwt.sign({
                "userId": user.userId,
                "mobileNumber": user.mobileNumber,
                "name": user.name
            }, process.env.SECRET);
            res.cookie('token',token,{
                httpOnly: true
            });
            res.status(200);
            return res.redirect('/');
        } else {
            res.status(400).json({ error: "Password Incorrect" });
        }
    }
};

// Function to handle user registration
const registerUser = async (req, res) => {
    const isUserRegistered = await User.findOne({
        where: {
            mobileNumber: req.body.mobileNumber,
        }
    });

    if (isUserRegistered) {
        return res.status(409).json({ error : "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const user = await User.create({
        name: req.body.name,
        mobileNumber: req.body.mobileNumber,
        password: await bcrypt.hash(req.body.password, salt)
    });

    const token = jwt.sign({
        "userId": user.userId,
        "mobileNumber": user.mobileNumber,
        "name": user.name
    }, process.env.SECRET);

    res.cookie('token', token, {
        httpOnly: true
    });

    res.redirect('/');
};

// Function to handle user logout
const logoutUser = async (req, res) => {
    res.clearCookie("token");
    res.redirect('/');
};

module.exports = {
    renderAuthPage,
    loginUser,
    registerUser,
    logoutUser
};