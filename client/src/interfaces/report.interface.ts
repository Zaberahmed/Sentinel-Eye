interface Street {
	id?: number;
	name: string;
}
interface Location {
	latitude: string;
	longitude: string;
	street: Street;
}
export interface Report {
	_id?: string;
	user_id?: string;
	category: string;
	context?: string;
	location: Location;
	date: string;
}
