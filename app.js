const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const logger = require('morgan');
const passport = require('passport');


const authMiddleware = require('./app/middlewares/authMiddleware');
const authAPIv1 = require('./app/routes/api/v1/auth');
const app = express();

passport.use(authMiddleware.strategy);
app.use(passport.initialize());



/**
 * API ROUTES
 */
app.use('/api/v1/auth', authAPIv1);

/**
 * Error Handling Middlewares.
 */

app.use(function (err, req, res, next) {
    return res.status(500).json({
        message: err.toString()
    });
});

module.exports = app;