const express = require('express');
const models = require('../models');
const fx = require('money');
const oxr = require('open-exchange-rates');
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
		if (( typeof fromCurrency == '' ) || ( toCurrency == '' ) || ( amount == '' )){
			note = "Please provide an entry for all fields.";
			console.log(note);
			res.render('calculator', {note: note});
		} else {
			oxr.latest(function(){
				fx.rates = oxr.rates;
				fx.base = oxr.base;
				
				newAmount = Math.round(fx(amount).from(fromCurrency).to(toCurrency));
				console.log(newAmount);
				res.render('calculator', {amount: amount, newAmount: newAmount, success: req.flash('success')});
			});
		}
	}
};
