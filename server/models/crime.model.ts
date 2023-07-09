import { Crime } from './../interfaces/crime.interface';
import { locationSchema } from './location.schema';
const mongoose = require('mongoose');

const crimeSchema: Crime = new mongoose.Schema({
	user_id: {
		type: mongoose.Schema.Types.ObjectId,
		require: true,
	},
	category: {
		type: String,
		require: true,
	},
	location: {
		type: locationSchema,
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

export const createCrimeReport = async (crime: Crime) => {
	try {
		const month = new Date().getMonth().toString();
		return await Crime.create({
			user_id: crime.user_id,
			category: crime.category,
			location: crime.location,
			context: crime.context,
			month: month,
		});
	} catch (error) {
		console.log(error);
	}
};

export const findAllCrime = async () => {
	try {
		return await Crime.find({});
	} catch (error) {
		console.log(error);
	}
};
export const findCrimeById = async (id: string) => {
	try {
		return await Crime.findOne({ _id: id });
	} catch (error) {
		console.log(error);
	}
};
export const findCrimeByMonth = async (month: string) => {
	try {
		return await Crime.findOne({ month: month });
	} catch (error) {
		console.log(error);
	}
};
