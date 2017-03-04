const express = require('express');

module.exports = {
	registerRouter() {
		const router = express.Router();

		router.use(function timeLog(req, res, next){
			console.log("Index Controller :: Time: ", Date.now());
			next();
		})

		router.get('/', this.index);

		return router;
	},
	index(req, res){
		res.render('index', {});
	},
};