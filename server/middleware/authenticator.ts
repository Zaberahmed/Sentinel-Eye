import { Request, Response, NextFunction } from 'express';
const { getSession } = require('./sessionManagement');

const authenticator = async (req: Request, res: Response, next: NextFunction) => {
	const token = req.headers.authorization?.split(' ')[1];

	if (!token) {
		return res.status(400).send({ message: 'Token not found!' });
	}

	const existingSession = getSession(token);
	if (!existingSession) {
		return res.status(400).send({ message: 'Session does not exist!' });
	}

	next();
};

module.exports = authenticator;
