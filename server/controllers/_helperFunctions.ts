const bcrypt = require('bcrypt');
const { findUserByEmail } = require('./../models/user.model');
import { RegisteredUser, LoggedUser } from 'interfaces/user.interface';

const saltRounds: number = 10;

export const hashing = async (password: string) => {
	return await bcrypt.hash(password, saltRounds).then((hash: string) => hash);
};

export const doesUserExist = async (email: string) => {
	const user = await findUserByEmail(email);

	if (!user) return false;
	return true;
};

export const checkCredentials = async (email: string, password: string) => {
	try {
		if (!(await doesUserExist(email))) return false;

		return await findUserByEmail(email).then((user: RegisteredUser | LoggedUser) => {
			if (user) return bcrypt.compare(password, user.password);
			return false;
		});
	} catch (error) {
		console.log(error);
	}
};
