const express = require('express'),
 models = require('../models'),
 fx = require('money'),
 oxr = require('open-exchange-rates'),
 config = require('../config/oxrKey');
s
oxr.set({app_id: config.key});

module.exports= {
	index(req, res){
		var rates,
				base
		oxr.latest(function(){
			rates = oxr.rates;
			base = oxr.base;
			console.log(base);
			console.log(rates);
		});
		res.render('dashboard', {base: oxr.base, rates: oxr.rates, success: req.flash('success') });
	}
};