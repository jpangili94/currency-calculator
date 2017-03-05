var mongoose = require('mongoose');

var CurrencySchema = new mongoose.Schema({
	base: {
		type: String,
		required: true
	},
	date: {
		type: Date,
		required: true
	},
	rate: { //Is this the correct format for key-value pair?
		key: {
			type: String,
			required: true
		},
		value: {
			type: Number,
			required: true
		}
	}
});

module.exports = CurrencySchema;