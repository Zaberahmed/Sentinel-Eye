export interface RegisteredUser {
	_id?: string;
	name: string;
	email: string;
	password: string;
	gender: string;
	age: string;
	address: string;
}
export interface LoggedUser {
	_id?: string;
	email: string;
	password: string;
}

// export type User = RegisteredUser | LoggedUser;
