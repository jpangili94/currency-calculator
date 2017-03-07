const express = require('express');

module.exports= {
	regesterRouter() {
		const router = express.Router();

		router.use(function timeLog(req, res, next){
			console.log("Currency API :: Time: ", Date.now());
			next();
		})

		router.get('/', this.index);
		router.post('/', this.list);

		return router;
	},
	index(req, res){
		// Save the api data into the database
		$.getJSON("http://api.fixer.io/latest?base=USD", function(data) {
			console.log(JSON.stringify(data));
		});
	},
	list(req, res, next){
		// List all the rates for a selected base currency
		var findBase = req.body.base;

		db.currencyDB.find({ base: findBase })
	}
}