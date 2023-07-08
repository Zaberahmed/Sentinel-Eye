import axios from 'axios';
import { LoggedUser, RegisteredUser } from '../interfaces/user.interface';

const API = axios.create({ baseURL: 'http://localhost:4000' });

API.interceptors.request.use((req) => {
	const userToken = localStorage.getItem('accessToken');
	if (userToken) {
		req.headers.Authorization = `Bearer ${JSON.parse(userToken)}`;
	}

	return req;
});

export const signIn = (data: LoggedUser) => API.post('/login', data);
export const signInGoogle = (accessToken: string) =>
	API.post('/login', {
		googleAccessToken: accessToken,
	});

export const signUp = (data: RegisteredUser) => API.post('/registration', data);
export const signUpGoogle = (accessToken: string) =>
	API.post('/registration', {
		googleAccessToken: accessToken,
	});
