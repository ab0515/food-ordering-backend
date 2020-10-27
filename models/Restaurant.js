const mongoose = require('mongoose');

let restaurantSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		unique: true
	},
	category: {
		type: String,
		required: true
	}
});

module.exports = mongoose.model('Restaurant', restaurantSchema);