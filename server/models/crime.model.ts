import { Crime } from 'interfaces/crime.interface';
const mongoose = require('mongoose');

const crimeSchema: Crime = new mongoose.Schema({
	user_id: {
		type: String,
		require: true,
	},
	category: {
		type: String,
		require: true,
	},
	location: {
		type: String,
		require: true,
	},
	context: {
		type: String,
		require: false,
	},
	month: {
		type: String,
		require: true,
	},
});

const Crime = mongoose.model('Crime', crimeSchema);
