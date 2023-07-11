const BASE_URL = 'http://localhost:4000';
import { Report } from '../interfaces/report.interface';

interface RegisterResponse {
	success: boolean;
	message: string;
}
// const token: string | null = localStorage.getItem('accessToken');
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHBpcmVzQXQiOjIwMDQ2NzI3MTk5MTMsInVzZXJJZCI6IjY0YThkMzgwOWVhZjQzMjNiZDYyNWM4YyIsImlhdCI6MTY4OTA1MzUxOX0.aC4PBtepmgd36u5pLyZ8mBKBqXcE5oWThvCjIZrxP6c';

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
const GetAllCrime = async (): Promise<Report[]> => {
	return await fetch(`${BASE_URL}/all-crime`, {
		method: 'GET',
		credentials: 'include',
		mode: 'cors',
		headers: { 'Content-Type': 'application/json', authorization: `Bearer ${token}` },
	})
		.then((res) => res.json())
		.catch((err) => console.log(err));
};

export { ReportCrime, GetAllCrime };
