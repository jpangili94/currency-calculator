const express = require('express');

module.exports = {
	registerRouter() {
		const router = express.Router();

		router.use(function timeLog(req, res, next){
			console.log("Currency Controller :: Time: ", Date.now());
		});

		router.get('/', this.index);

		return router;
	},
	index(req, res){
		res.send("Here are a list of currencies available in our program:");
	},
};