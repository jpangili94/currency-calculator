const express = require('express');
const router = express.Router();

router.use(function timeLog(req, res, next){
	console.log("Users Controller :: Time: ", Date.now());
	next();
})

// Define the root Index router
router.get('/', function(req, res){
	res.send('Users home Page');
});

module.exports = router;