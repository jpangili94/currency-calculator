const express = require('express'),
 engines = require('consolidate'),
 bodyParser = require('body-parser'),
 cookieParser = require('cookie-parser'),
 flash = require('connect-flash'),
 expressSession = require('express-session'),
 mongoose = require('mongoose'),
 methodOverride = require('method-override'),
 oxr = require('open-exchange-rates'),
 fx = require('money'),
 config = require('./config/database'),
 cors = require('cors'),
 passport = require('passport'),
 path = require('path');

const app = express();
app.use(methodOverride('_method'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(flash());
app.use(expressSession(({ secret: 'keyboard cat', resave: false, saveUninitialized: true })));
app.use(express.static(__dirname + '/public'));
app.use(cors());
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);

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
mongoose.connect(config.database);
// var db = mongoose.createConnection(config.database);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
	console.log("Successfully connected to Database.\n" + config.database + "\nConnected to Port 8005");

	// Load Models
	app.models = require('./models/index');

	// Load Controllers
	// const indexController = require('./controllers/indexController'),
	//  calculatorController = require('./controllers/calculatorController'),
	//  dashboardController = require('./controllers/dashboardController'),
	//  usersController = require('./controllers/usersController');

	// Mount Controllers
	// app.use('/', indexController.registerRouter());
	// app.use('/calculator', calculatorController.registerRouter());
	// app.use('/dashboard', dashboardController.registerRouter());
	// app.use('/users', usersController.registerRouter());

	// Load Routes
	const index = require('./routes/index'),
		dashboard = require('./routes/dashboard'),
		users = require('./routes/users');

	// Routes Middleware
	app.use('/', index);
	app.use('/dashboard', dashboard);
	app.use('/users', users);

	// Export the app
	module.exports = app;
	app.listen(8005);
});