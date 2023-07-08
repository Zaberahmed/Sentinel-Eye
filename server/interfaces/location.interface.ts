interface Street {
	id?: number;
	name: string;
}

export interface Location {
	latitude: string;
	longitude: string;
	street: Street;
}
