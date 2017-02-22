const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt-nodejs');
const User = require('../../../models/User');
const InvalidToken = require('../../../models/InvalidToken');
const config = require('dotenv').config();
const authHelper = require('../../../middlewares/authMiddleware');
const mailer = require('../../../utils/mailer');

const router = express.Router();

const JWT_KEY = process.env.JWT_KEY;
const DB_URL = process.env.DB_URL;

mongoose.connect(DB_URL);


router.use(bodyParser.json());

/**
 * User Signup Route.
 */

router.post('/signup', function (req, res, next) {
    let email = req.body.email,
        password = req.body.password;
    if (!email || !password) {
        return next();
    }
    let user = new User({
        email: email,
        password: password
    });

    user.save(function (err) {
        //Has Duplicate OR Invalid Email
        if (err) {
            return next(err);
        }
        return res.json({
            message: 'Signed Up Successfully'
        });
    });
});



/**
 * Error Handling Middlewares.
 */

router.use(function (err, req, res, next) {
    return res.status(400).json({
        message: err.toString()
    });
});

router.use(function (req, res) {
    return res.status(400).json({
        message: 'Invalid or Missing Data'
    });
});

module.exports = router;