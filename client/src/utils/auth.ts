class Auth {
	private authenticated: boolean;

	constructor() {
		this.authenticated = false;
	}

	login(cb: () => void) {
		this.authenticated = true;
		cb();
	}

	logout(cb: () => void) {
		this.authenticated = false;
		cb();
	}

	isAuthenticated() {
		return this.authenticated;
	}
}

const auth = new Auth();
export default auth;
