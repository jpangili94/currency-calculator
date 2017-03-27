const express = require('express'),
 models = require('../models'),
 fx = require('money'),
 oxr = require('open-exchange-rates');
oxr.set({ app_id: '359eaa80531846d49379a218e6520bac' });

module.exports= {
	registerRouter() {
		const router = express.Router();

		router.use(function timeLog(req, res, next){
			console.log("Dashboard API :: Time: ", Date.now());
			next();
		})

		router.get('/', this.index);

		return router;
	},
	index(req, res){
		var rates,
				base
		oxr.latest(function(){
			rates = oxr.rates;
			base = oxr.base;
			console.log(base);
			console.log(rates.AED);
		});
		res.render('dashboard', {base: oxr.base, rates: oxr.rates.AED, success: req.flash('success') });
	}
};