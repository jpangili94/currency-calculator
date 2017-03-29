const express = require('express'),
 models = require('../models'),
 fx = require('money'),
 oxr = require('open-exchange-rates'),
 config = require('../config/oxrKey');
oxr.set({app_id: config.key});

module.exports = {
	index(req, res){
		res.render('calculator', {});
	},
	submit(req, res){
		console.log(JSON.stringify(req.body));
		var fromCurrency = req.body.fromCurrency,
				toCurrency = req.body.toCurrency,
				amount = req.body.amount,
				newAmount,
				exchRate,
				note;
		if ( isNaN(amount) || ( amount == '' )) {
			note = "Please provide a numeric amount.";
			res.render('calculator', {note: note});
		} else {
			oxr.latest(function(){
				fx.rates = oxr.rates;
				fx.base = oxr.base;

				newAmount = (fx(amount).from(fromCurrency).to(toCurrency));

				exchRate = (newAmount / amount);

				console.log(newAmount);
				console.log(exchRate);
				res.render('calculator', {amount: amount, newAmount: newAmount, exchRate: exchRate, success: req.flash('success')});
			});
		}
	}
};
