import { Post } from './post.interface';

export interface RegisteredUser {
	_id?: string;
	name: string;
	email: string;
	password: string;
	gender: string;
	age: string;
	address: string;
	posts?: Post[];
	crimeReports?: Report[];
	// missingReports?: Missing[];
}
export interface LoggedUser {
	_id?: string;
	email: string;
	password: string;
}
