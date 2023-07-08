import { hashing, doesUserExist, checkCredentials } from './_helperFunctions';
import { Request, Response } from 'express';
const { createSession, getSession, destroySession } = require('./../middleware/sessionManagement');
import { findAllUser, findUserByEmail, findUserById, createUser } from './../models/user.model';
import axios from 'axios';

export const registration = async (req: Request, res: Response) => {
	try {
		const { name, gender, age, email, address, password } = req.body;

		if (await doesUserExist(email)) {
			return res.status(401).send({ message: 'Email already exists!' });
		}

		const hashedPassword = await hashing(password);
		const user = {
			name,
			gender,
			age,
			email,
			address,
			password: hashedPassword,
		};

		const newUser = await createUser(user);
		return res.status(200).send(newUser);
	} catch (error) {
		res.status(500);
		console.log(error);
	}
};

export const login = async (req: Request, res: Response) => {
	try {
		const { email, password } = req.body;

		if (!(await doesUserExist(email))) {
			return res.status(400).send({ message: 'There is no user with that email!' });
		}

		const isCredentialsOk = await checkCredentials(email, password);
		if (!isCredentialsOk) {
			return res.status(401).send({ message: 'Invalid password!' });
		}

		const { _id } = await findUserByEmail(email);

		const token = createSession(_id);
		res.cookie('accessToken', token, {
			httpOnly: false,
			secure: false,
			sameSite: 'strict',
		});

		return res.status(200).send({ accessToken: token });
	} catch (error) {
		res.status(500);
		console.log(error);
	}
};
