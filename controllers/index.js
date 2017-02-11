const express = require('express');
const router = express.Router();

router.use(function timeLog(req, res, next){
	console.log("Index Controller :: Time: ", Date.now());
	next();
})

// Define the root Index router
router.get('/', function(req, res){
	res.send('Home Page');
});

module.exports = router;