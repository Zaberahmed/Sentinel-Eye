const UK_URL = 'https://data.police.uk/api/crimes-at-location?date=2017-02&lat=52.629729&lng=-1.131592';

const GetAllCrimeFromUKAPI = async (longitude: number, latitude: number): Promise<Report[]> => {
	// const date = new Date().toISOString().slice(0, 7);
	// console.log(date);
	const date = '2023-04';
	const res = await fetch(`http://localhost:4000/uk-crime?lat=${latitude}&lng=${longitude}&date=${date}`, {
		method: 'GET',
		headers: { 'Content-Type': 'application/json' },
	});

	const data = await res.json();

	return data;
};

export { GetAllCrimeFromUKAPI };
