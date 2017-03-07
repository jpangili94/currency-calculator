const express = require('express');
const engines = require('consolidate');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');
const expressSession = require('express-session');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const fixer = require('node-fixer-io');

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
	res.status(500).render('error_template', { error : err });
}

// MongoDB Connection
mongoose.connect('mongodb://localhost/currencyDB');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
	console.log("Successfully connected to MongoDB.\nConnected to Port 8005");

	// Load Models
	app.models = require('./models/index');

	// Load Controllers
	const index = require('./controllers/index');
	const currency = require('./controllers/currency');

	// Mount Controllers
	app.use('/', index.registerRouter());
	app.use('/currency', currency.registerRouter());

	// Export the app
	module.exports = app;
	app.listen(8005);

});