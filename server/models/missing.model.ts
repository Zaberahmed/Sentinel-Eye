import { Missing } from './../interfaces/missing.interface';
const mongoose = require('mongoose');

const missingSchema: Missing = new mongoose.Schema({
	user_id: {
		type: mongoose.Schema.Types.ObjectId,
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
	timestamp: {
		type: String,
		required: true,
	},
});
const Missing = mongoose.model('Missing', missingSchema);

export const createMissingReport = async (missing: Missing) => {
	try {
		const time = new Date().getMonth().toString();
		return await Missing.create({
			user_id: missing.user_id,
			type: missing.type,
			name: missing.name,
			image: missing.image,
			last_seen: missing.last_seen,
			age: missing.age,
			height: missing.height,
			description: missing.description,
			timestamp: time,
		});
	} catch (error) {
		console.log(error);
	}
};
export const findAllMissing = async () => {
	try {
		return await Missing.find({});
	} catch (error) {
		console.log(error);
	}
};
export const findMissingById = async (id: string) => {
	try {
		return await Missing.findOne({ _id: id });
	} catch (error) {
		console.log(error);
	}
};
export const findMissingByMonth = async (time: string) => {
	try {
		return await Missing.findOne({ timestamp: time });
	} catch (error) {
		console.log(error);
	}
};
