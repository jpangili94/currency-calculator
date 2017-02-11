const express = require('express');
const app = express();

// Load Controllers
const index = require('./controllers/index');
const users = require('./controllers/users');

// Mount Controllers
app.use('/', index);
app.use('/users', users);

module.exports = app;
app.listen(8005);

// // Consuming query parameters
// app.get('/users/:username', (req, res) => {
//   let msg = 'The username is: ' + req.params.username;
//   if (req.query.test != null) {
//     msg += ' -- A test query received!'
//   }
//   res.send(msg);
// });

// // Consuming route parameters
// app.get('/users/:username', (req, res) => {
//   res.send('The username is:' + req.params.username);
// });


// // GET method route
// app.get('/', function(req, res){
// 	res.send("Get request to the homepage");
// });

// // POST method route
// app.post('/', function (req, res) {
//   res.send('POST request to the homepage');
// });

// // Responding to an /articles route
// app.get('/articles', function (req, res) {
//   res.send('In articles listing page.')
// });