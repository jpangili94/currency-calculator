const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');
const expressSession = require('express-session');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
// const models = require('../models');

// mongoose.connect('mongodb://localhost/[db name]');

const app = express();
app.use(methodOverride('_method'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(flash());
app.use(expressSession(({ secret: 'keyboard cat', resave: false, saveUninitialized: true })));


// Load Controllers
const index = require('./controllers/index');
const currency = require('./controllers/currency');

// Mount Controllers
app.use('/', index.registerRouter());
app.use('/currency', currency.registerRouter());

// Export the app
module.exports = app;
app.listen(8005);