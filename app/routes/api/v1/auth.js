const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const User = require('../../../models/User');
const InvalidToken = require('../../../models/InvalidToken');
const authHelper = require('../../../middlewares/authMiddleware');
const mailer = require('../../../utils/mailer');

const router = express.Router();
const Strings = require('../../../utils/strings');

const JWT_KEY = process.env.JWT_KEY;
const DB_URL = process.env.DB_URL;

require('dotenv').config();
mongoose.connect(DB_URL);


router.use(bodyParser.json());


/**
 * User Signup Route.
 */

/**
 * @swagger
 * /api/v1/auth/signup:
 *   post:
 *     summary: Student Signup
 *     produces:
 *       - application/json
 *     consumes:
 *       - application/json
 *     parameters:
 *       - name: body
 *         description: The new student details.
 *         in: body
 *         required: true
 *         type: string
 *         schema:
 *            $ref: '#/definitions/SignUpParameters'
 *     responses:
 *       200:
 *         description: Successful Signup
 *         schema:
 *          $ref: '#/definitions/SignUpSuccessResponse'
 *         examples:
 *           application/json:
 *             {
 *                status: 1,
 *                message: Signed Up Successfully.
 *            }
 *       400:
 *         description: Invalid/Missing User data. 
 *         schema:
 *          $ref: '#/definitions/SignUpFailure'
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
        return next(Strings.NON_GUC_MAIL);
    }


    // Check if password and confirmation mismatch
    if (password !== confirmPassword) {
        return next(Strings.PASSWORD_MISMATCH);
    }

    // Check that password satisfies password conditions
    // The password must be at least 8 characters and includes at least a digit
    //  and a special character.
    // http://stackoverflow.com/questions/19605150/

    const passwordRegex = /(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/;
    if (!passwordRegex.test(password)) {
        return next(Strings.INVALID_PASSWORD);
    }

    // Check for valid GUC ID
    // http://stackoverflow.com/questions/9742074/
    // TODO: Validate that HE IS MET/BI Final Year Student
    // TODO: Validate that no duplicate IDs

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
            status: 1,
            message: Strings.SIGNUP_SUCCESS
        });
    });
});



/**
 * User Login Route.
 */

/**
 * @swagger
 * /api/v1/auth/login:
 *   post:
 *     summary: Student Login
 *     produces:
 *       - application/json
 *     consumes:
 *       - application/json
 *     parameters:
 *       - name: body
 *         description: Login information for the student.
 *         in: body
 *         required: true
 *         type: string
 *         schema:
 *            $ref: '#/definitions/LoginParameters'
 *     responses:
 *       200:
 *         description: Successful Login
 *         schema:
 *          $ref: '#/definitions/LoginSuccessResponse'
 *         examples:
 *           application/json:
 *             {
 *                status: 1,
 *                token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjU4YWU5N2E3ZDdkMzY0MDhlZmU0NmViNSIsImlhdCI6MTQ4,
 *                message: Logged In Successfully.
 *            }
 *       400:
 *         description: Invalid/Missing User data. 
 *         schema:
 *          $ref: '#/definitions/LoginFailureResponse'
 */

router.post('/login', function (req, res, next) {
    let email = req.body.email,
        password = req.body.password;

    if (!email || !password)
        return next(Strings.MISSING_CREDIENTIALS);

    User.findOne({
        email
    }, function (err, result) {
        if (err) {
            return next(err);
        }
        if (!result) {
            return next(Strings.INVALID_CREDIENTIALS);
        }
        result.checkPassword(password, function (err, match) {
            if (err) {
                return next(err);
            }

            //Wrong Password
            if (!match) {
                return next(Strings.INVALID_CREDIENTIALS);
            }

            let token = jwt.sign({
                id: result._id
            }, JWT_KEY, {
                expiresIn: '10d'
            });

            return res.json({
                status: 1,
                message: Strings.LOGIN_SUCCESS,
                token: token
            });
        });

    });
});


/**
 * User Forgot Password Route.
 */

/**
 * @swagger
 * /api/v1/auth/forgot:
 *   post:
 *     summary: Student Forgot password
 *     produces:
 *       - application/json
 *     consumes:
 *       - application/json
 *     parameters:
 *       - name: body
 *         description: The email associated with the student.
 *         in: body
 *         required: true
 *         type: string
 *         schema:
 *            $ref: '#/definitions/ForgotPwdParameters'
 *     responses:
 *       200:
 *         description: An email is sent to the user with a password reset link if the email exists in the system.
 *         schema:
 *          $ref: '#/definitions/LoginFailureResponse'
 *         examples:
 *           application/json:
 *             {
 *                status: 1,
 *                message: 'You should recieve an email to reset your password, if the email exists'
 *            }
 *       400:
 *         description: Invalid Email. 
 *         schema:
 *          $ref: '#/definitions/SignUpFailure'
 */
router.post('/forgot', function (req, res, next) {
    const email = req.body.email;

    // Check that it's GUC mail
    // http://www.regexpal.com/94044

    const mailRegex = /^[a-zA-Z0-9_.+-]+@(?:(?:[a-zA-Z0-9-]+\.)?[a-zA-Z]+\.)?(student)\.guc.edu.eg$/;
    if (!mailRegex.test(email)) {
        return next(Strings.NON_GUC_MAIL);
    }

    const iat = Math.floor(Date.now() / 1000);
    const resetToken = jwt.sign({
        email,
        iat
    }, JWT_KEY, {
        expiresIn: '1h'
    });

    User.findOne({
        email
    }, function (err, user) {
        if (err) {
            return next(err);
        }

        if (!user) { // User not found, Invalid mail
            // Not using middleware due to status
            return res.json({
                status: 1,
                message: Strings.CHECK_YOU_EMAIL
            });
        }

        user.passwordResetTokenDate = iat * 1000;

        user.save(function (err) {
            if (err) {
                return next(err);
            }

            // Send mail
            mailer.forgotPassword(email, req.headers.host, resetToken, function (err, result) {
                return res.json({
                    status: 1,
                    message: Strings.CHECK_YOU_EMAIL
                });
            });
        });

    });
});


/**
 * User Reset Password Route.
 */
/**
 * @swagger
 * /api/v1/auth/reset:
 *   post:
 *     summary: Student Reset password
 *     produces:
 *       - application/json
 *     consumes:
 *       - application/json
 *     parameters:
 *       - name: body
 *         description: The reset token and password.
 *         in: body
 *         required: true
 *         type: string
 *         schema:
 *            $ref: '#/definitions/ResetPwdParameters'
 *     responses:
 *       200:
 *         description: The password was reset successfully.
 *         schema:
 *          $ref: '#/definitions/PwdResetSuccess'
 *         examples:
 *           application/json:
 *             {
 *                status: 1,
 *                message: 'Password Changed Successfully.'
 *            }
 *       400:
 *         description: Invalid/Missing Data. 
 *         schema:
 *          $ref: '#/definitions/SignUpFailure'
 */

router.post('/reset/', function (req, res, next) {

    const resetToken = req.body.token;
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;


    // Check If any required field are missing
    if (!(password && confirmPassword && resetToken)) {
        return next(Strings.INVALID_RESET_TOKEN);
    }

    // Check if password and confirmation mismatch
    if (password !== confirmPassword) {
        return next(Strings.PASSWORD_MISMATCH);
    }


    // Check that password satisfies password conditions
    // The password must be at least 8 characters and includes at least a digit
    //  and a special character.
    // http://stackoverflow.com/questions/19605150/

    const passwordRegex = /(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/;
    if (!passwordRegex.test(password)) {
        return next(Strings.INVALID_PASSWORD);
    }

    jwt.verify(resetToken, JWT_KEY, function (err, payload) {
        if (err) {
            return next(Strings.INVALID_RESET_TOKEN);
        }

        const email = payload.email;
        const creationDate = new Date(parseInt(payload.iat) * 1000);

        User.findOne({
            email,
            passwordResetTokenDate: {
                $lte: creationDate
            }
        }, function (err, user) {
            if (err) {
                return next(err);
            }

            if (!user) {
                return next(Strings.INVALID_RESET_TOKEN);
            }

            user.passwordResetTokenDate = undefined; // Disable the token
            user.passwordChangeDate = Date.now(); // Invalidate Login Tokens
            user.password = password; // Reset password

            user.save(function (err) {
                if (err) {
                    return next(err);
                }

                return res.json({
                    status: 1,
                    message: Strings.PASSWORD_RESET_SUCCESS
                });
            });
        });
    });
});



/**
 * Error Handling Middlewares.
 */

router.use(function (err, req, res, next) {
    return res.status(400).json({
        status: 0,
        message: handleError(err)
    });
});

router.use(function (req, res) {
    return res.status(404).json({
        status: 0,
        message: Strings.INVALID_ROUTE
    });
});


/**
 * Returns a human readable error message.
 * @param {Error} err - The error recieved.
 * @returns {String} 
 */

const handleError = err => {
    let msg = err.toString();
    if (err.code == 11000) {
        msg = Strings.USER_ALREADY_EXISTS;
    }
    return msg;
};

module.exports = router;