import { Street, Location } from './../interfaces/location.interface';

const mongoose = require('mongoose');
const streetSchema: Street = new mongoose.Schema({
	id: {
		type: String,
		required: false,
	},
	name: {
		type: String,
		require: true,
	},
});
export const locationSchema: Location = new mongoose.Schema({
	latitude: {
		type: String,
		require: true,
	},
	longitude: {
		type: String,
		require: true,
	},
	street: {
		type: streetSchema,
		require: false,
	},
});
