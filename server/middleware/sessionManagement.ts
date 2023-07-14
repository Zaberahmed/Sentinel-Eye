const jwt = require('jsonwebtoken');

const SECRET_KEY = 'HELLO_WORLD'; //process.env
const blokcedList: string[] = [];

const createSession = (userId: string) => {
	const expiry = new Date();
	expiry.setFullYear(expiry.getFullYear() + 10);

	const newSession = {
		expiresAt: expiry.valueOf(),
		userId: userId,
	};

	return jwt.sign(newSession, SECRET_KEY);
};

const getSession = (token: string) => {
	if (blokcedList.includes(token)) return undefined;

	const sessionData = jwt.verify(token, SECRET_KEY);

	if (sessionData.expiresAt < Date.now()) {
		console.log('Token has expired.');
		return undefined;
	}

	return sessionData;
};

const destroySession = (token: string) => {
	blokcedList.push(token);
	return true;
};

export { createSession, getSession, destroySession };
