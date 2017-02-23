const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const logger = require('morgan');
const passport = require('passport');


const authMiddleware = require('./app/middlewares/authMiddleware');
const authAPIv1 = require('./app/routes/api/v1/auth');

const swaggerUi = require('swagger-ui-express');

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


/**
 * Swagger Configuration
 */

const swaggerJSON = require('./app/swagger/restlet-swagger.json');
app.use('/api/v1/docs', swaggerUi.serve, swaggerUi.setup(swaggerJSON));

app.use('/api/v1/auth', authAPIv1);

/**
 * Generic Error Handling Middlewares.
 */
app.use(function (err, req, res, next) {
    return res.status(500).json({
        message: err.toString()
    });
});

module.exports = app;