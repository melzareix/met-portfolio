const express = require('express');
const authAPIv1 = require('./app/routes/api/v1/auth');

const app = express();

app.use('/api/v1/auth', authAPIv1);
module.exports = app;