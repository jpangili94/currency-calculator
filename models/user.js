const mongoose = require('mongoose'),
	bcrypt = require('bcryptjs'),
	config = require('../config/database');

// User Schema + properties
const UserSchema = mongoose.Schema({
	name: {
		type: String, // Data type
		required: true // Validation
	},
	email: {
		type: String,
		required: true
	},
	employeeId: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	}
});

// Create Mongoose model that takes in the the 
// name of the model and the schema as parameters
const User = module.exports = mongoose.model('User', UserSchema);

// Use functions outside using module.exports
module.exports.getUserById = function(id, callback){
	User.findById(id, callback);
}

// Find a user by their username
module.exports.getUserByEmployeeId = function(employeeId, callback){
	const query = {employeeId: employeeId};
	User.findOne(query, callback);
}

// Add new user
module.exports.addUser = function(newUser, callback){
	// Hash the Password
	bcrypt.genSalt(10, function(err, salt){
		bcrypt.hash(newUser.password, salt, function(err, hash){
			if(err) throw err;
			newUser.password = hash;
			newUser.save(callback);
		});
	});
}

// Login User
module.exports.comparePassword = function(candidatePassword, hash, callback){
	bcrypt.compare(candidatePassword, hash, function(err, isMatch){
		if(err) throw err;
		callback(null, isMatch);
	});
}