const express = require('express'),
	indexController = require('../controllers/indexController');

module.exports = {
	registerRouter() {
		const router = express.Router();

		router.use(function timeLog(req, res, next){
			console.log("Index Controller :: Time: ", Date.now());
			next();
		})

		router.get('/', indexController.index);

		return router;
	}
};