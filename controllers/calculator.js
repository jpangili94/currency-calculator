const express = require('express'),
 models = require('../models'),
 fx = require('money'),
 oxr = require('open-exchange-rates');
oxr.set({ app_id: '359eaa80531846d49379a218e6520bac' });

module.exports = {
	registerRouter() {
		const router = express.Router();

		router.use(function timeLog(req, res, next){
			console.log("Currency Controller :: Time: ", Date.now());
			next();
		})

		router.get('/', this.index);
		router.post('/', this.submit);
		router.get('/', this.latest);

		return router;
	},
	index(req, res){
		res.render('calculator', {});
	},
	submit(req, res){
		console.log(JSON.stringify(req.body));
		var fromCurrency = req.body.fromCurrency,
				toCurrency = req.body.toCurrency,
				amount = req.body.amount,
				newAmount,
				note;
		if ( isNaN(amount) || ( amount == '' )) {
			note = "Please provide a numeric amount.";
			res.render('calculator', {note: note});
		} else {
			oxr.latest(function(){
				fx.rates = oxr.rates;
				fx.base = oxr.base;
				
				newAmount = (fx(amount).from(fromCurrency).to(toCurrency));
				console.log(newAmount);
				res.render('calculator', {amount: amount, newAmount: newAmount, success: req.flash('success')});
			});
		}
	},
	latest(req, res){
		
	}
};
