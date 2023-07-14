import { Crime } from './crime.interface';
import { Missing } from './missing.interface';
import { Post } from './post.interface';

export interface RegisteredUser {
	name: string;
	email: string;
	password: string;
	gender: string;
	age: string;
	address: string;
	posts?: Post[];

	crimeReports?: Crime[];
	missingReports?: Missing[];
}
export interface LoggedUser {
	email: string;
	password: string;
}
