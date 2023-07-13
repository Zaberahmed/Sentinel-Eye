const BASE_URL = 'http://localhost:4000';

import { Post } from '../interfaces/post.interface';
import { Report } from '../interfaces/report.interface';
import { LoggedUser, RegisteredUser } from '../interfaces/user.interface';

interface RegisterResponse {
	success: boolean;
	message: string;
	accessToken: string;
}
const token: string | null = localStorage.getItem('accessToken');

const register = async (user: RegisteredUser): Promise<RegisteredUser> => {
	return await fetch(`${BASE_URL}/registration`, {
		method: 'POST',
		credentials: 'include',
		mode: 'cors',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(user),
	})
		.then((res) => res.json())
		.catch((err) => console.log(err));
};

const login = async (user: LoggedUser): Promise<RegisterResponse> => {
	return await fetch(`${BASE_URL}/login`, {
		method: 'POST',
		credentials: 'include',
		mode: 'cors',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(user),
	})
		.then((res) => res.json())
		.catch((err) => console.log(err));
};

const ReportCrime = async (report: Report): Promise<RegisterResponse> => {
	return fetch(`${BASE_URL}/create-crime-report`, {
		method: 'POST',
		credentials: 'include',
		mode: 'cors',
		headers: { 'Content-Type': 'application/json', authorization: `Bearer ${token}` },
		body: JSON.stringify(report),
	})
		.then((res) => res.json())
		.catch((err) => console.log(err));
};

const GetAllCrime = async (): Promise<RegisterResponse> => {
	const res = await fetch(`${BASE_URL}/all-crime`, {
		method: 'GET',
		credentials: 'include',
		mode: 'cors',
		headers: { 'Content-Type': 'application/json' },
	});
	const data = await res.json();
	return data;
};

const createPost = async (post: Post): Promise<RegisterResponse> => {
	return await fetch(`${BASE_URL}/create-post`, {
		method: 'POST',
		credentials: 'include',
		mode: 'cors',
		headers: { 'Content-Type': 'application/json', authorization: `Bearer ${token}` },
		body: JSON.stringify(post),
	})
		.then((res) => res.json())
		.catch((err) => console.log(err));
};

export { register, login, ReportCrime, GetAllCrime, createPost };
