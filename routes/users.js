const express = require('express'),
	usersController = require('../controllers/usersController'),
	passport = require('passport'),
	jwt = require('jsonwebtoken');

module.exports = {
	registerRouter() {
		const router = express.Router();

		router.use(function timeLog(req, res, next){
			console.log("Users Controller :: Time: ", Date.now());
			next();
		});
		router.post('/register', usersController.register);
		router.post('/authenticate', usersController.authenticate);
		router.get('/profile', passport.authenticate('jwt', {session: false}), usersController.profile);

		return router;
	}
};