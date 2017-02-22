const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const logger = require('morgan');
const passport = require('passport');


const authMiddleware = require('./app/middlewares/authMiddleware');
const authAPIv1 = require('./app/routes/api/v1/auth');

const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');
const options = {
    swaggerDefinition: {
        info: {
            title: 'MET Portfolio', // Title (required)
            version: '2.0.0', // Version (required)
        },
    },
    apis: ['./app/routes/api/v1/*.js', './app/swagger/*.js'], // Path to the API docs
};
const swaggerSpec = swaggerJSDoc(options);

const app = express();


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
app.use('/api/v1/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, true));
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