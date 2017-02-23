const app = require('./app')
const config = require('dotenv').config()

const port = process.env.PORT;

app.listen(port);