const express = require('express'),
	dashboardController = require('../controllers/dashboardController'),
	passport = require('passport'),
	jwt = require('jsonwebtoken');

module.exports = {
	registerRouter() {
		const router = express.Router();

		router.use(function timeLog(req, res, next){
			console.log("Dashboard API :: Time: ", Date.now());
			next();
		})

		router.get('/', passport.authenticate('jwt', {session: false}), dashboardController.index);

		return router;
	}
};