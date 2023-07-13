const UK_URL = 'https://data.police.uk/api/crimes-at-location?date=2017-02&lat=52.629729&lng=-1.131592';

const GetAllCrimeFromUKAPI = async (): Promise<Report[]> => {
	const res = await fetch(`http://localhost:5000/uk-crime?lat=52.629729&lng=-1.131592&date=2022-01`, {
		method: 'GET',
		headers: { 'Content-Type': 'application/json' },
	});

	const data = await res.json();

	return data;
};

export { GetAllCrimeFromUKAPI };
