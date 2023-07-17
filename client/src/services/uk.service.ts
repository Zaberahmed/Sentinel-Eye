const UK_URL = 'https://data.police.uk/api/crimes-at-location?date=2017-02&lat=52.629729&lng=-1.131592';

const GetAllCrimeFromUKAPI = async (longitude: number, latitude: number, category: string): Promise<Report[]> => {
	const date = '2023-04';
	const res = await fetch(`http://localhost:4000/uk-crime?lat=${latitude}&lng=${longitude}&date=${date}&crime_category=${category}`, {
		method: 'GET',
		headers: { 'Content-Type': 'application/json' },
	});

	const data = await res.json();
	// console.log(data);
	return data;
};

export { GetAllCrimeFromUKAPI };
