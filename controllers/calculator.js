const express = require('express');
const models = require('../models');
const fixer = require('node-fixer-io');

module.exports = {
	registerRouter() {
		const router = express.Router();

		router.use(function timeLog(req, res, next){
			console.log("Currency Controller :: Time: ", Date.now());
			next();
		})

		router.get('/', this.index);
		router.post('/', this.submit);

		return router;
	},
	index(req, res){
		res.render('calculator', {});
	},
	submit(req, res){
		console.log(JSON.stringify(req.body));
		var fromCurrency = req.body.fromCurrency;
				toCurrency = req.body.toCurrency,
				amount = req.body.amount;
		if (( typeof fromCurrency == '' ) || ( toCurrency == '' ) || ( amount == '' )){
			console.log("Please provide an entry for all fields.");
		} else {
			fixer.get(function (err, res, body) {
				var newAmount = fixer.convert(fromCurrency, toCurrency, amount);
				console.log(newAmount);
			});
		}
	}
};
