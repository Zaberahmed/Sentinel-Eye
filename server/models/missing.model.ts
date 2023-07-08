import { Missing } from 'interfaces/missing.interface';
const mongoose = require('mongoose');

const missingSchema: Missing = new mongoose.Schema({
	user_id: {
		type: String,
		require: true,
	},
	type: {
		type: String,
		require: true,
	},
	name: {
		type: String,
		require: false,
	},
	image: {
		type: String,
		require: false,
	},
	last_seen: {
		type: String,
		require: false,
	},
	age: {
		type: String,
		require: false,
	},
	height: {
		type: String,
		require: false,
	},
	description: {
		type: [String],
		require: false,
	},
});
const Missing = mongoose.model('Missing', missingSchema);
