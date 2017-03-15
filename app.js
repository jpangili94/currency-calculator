const express = require('express');
const engines = require('consolidate');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');
const expressSession = require('express-session');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const oxr = require('open-exchange-rates');
const fx = require('money');

const app = express();
app.use(methodOverride('_method'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(flash());
app.use(expressSession(({ secret: 'keyboard cat', resave: false, saveUninitialized: true })));
app.use(express.static(__dirname + '/public'));

// View Engine
app.engine('html', engines.nunjucks);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');
app.use(bodyParser.urlencoded({ extended : true }));

// Handler for internal server errors
function errorHandler(err, req, res, next){
	console.error(err.message);
	console.error(err.stack);
	res.status(500).render('errorTemplate', { error : err });
}

// MongoDB Connection
// mongoose.connect('mongodb://localhost/exchangeRatesDB');

// var db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', function() {});
	console.log("Successfully connected to MongoDB.\nConnected to Port 8005");

	// Load Models
	app.models = require('./models/index');

	// Load Controllers
	const index = require('./controllers/index');
	const calculator = require('./controllers/calculator');
	const dashboard = require('./controllers/dashboard');

	// Mount Controllers
	app.use('/', index.registerRouter());
	app.use('/calculator', calculator.registerRouter());
	app.use('/dashboard', dashboard.registerRouter());

	// Export the app
	module.exports = app;
	app.listen(8005);