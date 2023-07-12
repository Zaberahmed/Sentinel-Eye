import { hashing, doesUserExist, checkCredentials } from './_helperFunctions';
import { Request, Response } from 'express';
const { createSession, getSession, destroySession } = require('./../middleware/sessionManagement');
import { findAllUser, findUserByEmail, findUserById, createUser } from './../models/user.model';
// import axios from 'axios';

const registration = async (req: Request, res: Response) => {
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
		res.send(error);
	}
};

const login = async (req: Request, res: Response) => {
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
const profile = async (req: Request, res: Response) => {
	try {
		const token = req.headers.authorization?.split(' ')[1];

		const session = getSession(token);

		const profile = await findUserById(session.userId);

		return res.status(200).send(profile);
	} catch (error) {
		res.status(500);
		console.log(error);
	}
};
const getAllUser = async (req: Request, res: Response) => {
	try {
		const users = await findAllUser();
		return res.status(200).send(users);
	} catch (error) {
		console.log(error);
	}
};
const getUser = async (req: Request, res: Response) => {
	try {
		const { _id } = req.body;
		const user = await findUserById(_id);
		return res.status(200).send(user);
	} catch (error) {
		console.log(error);
	}
};

const logout = (req: Request, res: Response) => {
	try {
		// const token = req.cookies.accessToken;
		const token = req.headers.authorization?.split(' ')[1];

		if (!destroySession(token)) {
			return res.status(400).send({ message: 'No session to logout.' });
		}
		return res.status(200).send({ message: 'successfully logged out!' });
	} catch (error) {
		console.log(error);
	}
};

export { registration, login, profile, getAllUser, getUser, logout };
