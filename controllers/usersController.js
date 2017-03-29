const express = require('express'),
	router = express.Router(),
	passport = require('passport'),
	jwt = require('jsonwebtoken'),
	config = require('../config/database'),
	User = require('../models/user');

module.exports = {
	register(req, res, next){
		let newUser = new User({
			name: req.body.name,
			email: req.body.email,
			employeeId: req.body.employeeId,
			password: req.body.password
		});

		// Add User to Database
		User.addUser(newUser, (err, user) => {
			if(err){
				res.json({success: false, msg: "Failed to register new user"});
			} else {
				res.json({success: true, msg: "Registered new user"});	
			}
		});
	},
	authenticate(req, res, next){
		const employeeId = req.body.employeeId,
			password = req.body.password;

		User.getUserByEmployeeId(employeeId, function(err, user){
			if(err) throw err;
			if(!user) {
				return res.json({success: false, msg: "User not found."});
			}
			User.comparePassword(password, user.password, function(err, isMatch){
				if(err) throw err;
				// if password matches hash
				if(isMatch) {
					const token = jwt.sign(user, config.secret, {
						// Options to User Login is 1 week login duration
						expiresIn: 604800
					});
					res.json({
						success: true,
						token: 'JWT ' + token,
						user: {
							id: user._id,
							name: user.name,
							employeeId: user.employeeId,
							email: user.email
						}
					});
				} else {
					return res.json({success: false, msg: "Password does not match."});
				}
			});
		});
	},
	// Protected dashboard route
	profile(req, res, next){
		res.json({user: req.user}); //send the profile data
	}
};
