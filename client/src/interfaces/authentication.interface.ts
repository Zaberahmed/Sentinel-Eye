export default interface UserAuthentication {
	isAuthenticated: boolean;
	setIsAuthenticated: (isAuthenticated: boolean) => void;
}
