import { RegisteredUser } from 'interfaces/user.interface';
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	address: {
		type: String,
		required: true,
	},

	email: {
		type: String,
		required: true,
		unique: true,
	},
	gender: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
	age: {
		type: String,
		required: true,
	},
});

const User = mongoose.model('User', userSchema);

export const findAllUser = async () => {
	try {
		return await User.find({});
	} catch (error) {
		console.log(error);
	}
};

export const findUserByEmail = async (email: string) => {
	try {
		return await User.findOne({ email: email });
	} catch (error) {
		console.log(error);
	}
};

export const findUserById = async (id: string) => {
	try {
		return await User.findOne({ _id: id });
	} catch (error) {
		console.log(error);
	}
};

export const createUser = async (user: RegisteredUser) => {
	try {
		return await User.create({
			name: user.name,
			address: user.address,
			age: user.age,
			email: user.email,
			gender: user.gender,
			password: user.password,
		});
	} catch (error) {
		console.log(error);
	}
};
