const BASE_URL = 'http://localhost:4000';
const UK_URL = 'https://data.police.uk/api/crimes-at-location?date=2017-02&lat=52.629729&lng=-1.131592';

import { Report } from '../interfaces/report.interface';
import { LoggedUser, RegisteredUser } from '../interfaces/user.interface';

interface RegisterResponse {
	success: boolean;
	message: string;
}
const token: string | null = localStorage.getItem('accessToken');

interface AccessToken {
	accessToken: string;
}

const register = async (user: RegisteredUser): Promise<AccessToken> => {
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

const login = async (user: LoggedUser): Promise<AccessToken> => {
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

const GetAllCrimeFromUKAPI = async (): Promise<Report[]> => {
	const res = await fetch(`http://localhost:5000/uk-crime?lat=52.629729&lng=-1.131592&date=2022-01`, {
		method: 'GET',
		headers: { 'Content-Type': 'application/json' },
	});

	const data = await res.json();

	return data;
};

const GetAllCrime = async (): Promise<Report[]> => {
	const res = await fetch(`${BASE_URL}/all-crime`, {
		method: 'GET',
		credentials: 'include',
		mode: 'cors',
		headers: { 'Content-Type': 'application/json' },
	});
	const data = await res.json();
	return data;
};

export { register, login, ReportCrime, GetAllCrime, GetAllCrimeFromUKAPI };
