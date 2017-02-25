const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const logger = require('morgan');
const path = require('path');
const passport = require('passport');


const authMiddleware = require('./app/middlewares/authMiddleware');
const authAPIv1 = require('./app/routes/api/v1/auth');
const portfolioAPIv1 = require('./app/routes/api/v1/portfolio');

const app = express();
require('dotenv').config();

/**
 * Passport Initialization
 */

passport.use(authMiddleware.strategy);
app.use(passport.initialize());


/**
 * DEBUG MODE MIDDLEWARES
 */

if (process.env.DEBUG_MODE) {
    app.use(logger('dev'));
}

/**
 * API ROUTES
 */

app.use('/api/v1/auth', authAPIv1);
app.use('/api/v1/portfolio', portfolioAPIv1);

app.use(express.static(path.join(__dirname,'./public/')));

/**
 * Generic Error Handling Middlewares.
 */
app.use(function (err, req, res, next) {
    return res.status(500).json({
        message: err.toString()
    });
});

module.exports = app;