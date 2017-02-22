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
const Strings = require('../../../utils/strings');

const JWT_KEY = process.env.JWT_KEY;
const DB_URL = process.env.DB_URL;

mongoose.connect(DB_URL);


router.use(bodyParser.json());

/**
 * User Signup Route.
 */

router.post('/signup', function (req, res, next) {
    let email = req.body.email,
        password = req.body.password,
        confirmPassword = req.body.confirmPassword,
        firstName = req.body.firstName,
        lastName = req.body.lastName,
        gucId = req.body.gucId;

    // Check If any required field are missing
    if (!email || !password || !password || !confirmPassword || !firstName || !lastName || !gucId) {
        return next(Strings.INCOMPLETE_INFORMATION);
    }

    // Check that it's GUC mail
    // http://www.regexpal.com/94044

    const mailRegex = /^[a-zA-Z0-9_.+-]+@(?:(?:[a-zA-Z0-9-]+\.)?[a-zA-Z]+\.)?(student)\.guc.edu.eg$/;
    if (!mailRegex.test(email)) {
        return next(new Error(Strings.NON_GUC_MAIL));
    }

    const passwordRegex = /(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/;

    // Check if password and confirmation mismatch
    if (password !== confirmPassword) {
        return next(Strings.PASSWORD_MISMATCH);
    }

    // Check that password satisfies password conditions
    // The password must be at least 8 characters and includes at least a digit
    //  and a special character.
    // http://stackoverflow.com/questions/19605150/

    if (!passwordRegex.test(password)) {
        return next(Strings.INVALID_PASSWORD);
    }

    // Check for valid GUC ID
    // http://stackoverflow.com/questions/9742074/

    const gucIdRegex = /^[0-9]{2}-[0-9]{4,6}$/
    if (!gucIdRegex.test(gucId)) {
        return next(Strings.INVALID_GUC_ID);
    }

    // Information is valid
    let user = new User({
        firstName,
        lastName,
        gucId,
        email,
        password
    });

    user.save(function (err) {
        //Has Duplicate OR Invalid Data
        if (err) {
            return next(err);
        }
        return res.json({
            message: Strings.SIGNUP_SUCCESS
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
    return res.status(404).json({
        message: 'Invalid or Missing Data'
    });
});

module.exports = router;