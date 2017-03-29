const express = require('express'),
	calculatorController = require('../controllers/calculatorController');

module.exports = {
	registerRouter() {
		const router = express.Router();

		router.use(function timeLog(req, res, next){
			console.log("Currency Controller :: Time: ", Date.now());
			next();
		})

		router.get('/', calculatorController.index);
		router.post('/', calculatorController.submit);

		return router;
	}
};