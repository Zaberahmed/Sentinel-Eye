import './login.component.css';
import { useState, ChangeEvent, FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LoggedUser } from '../../interfaces/user.interface';
import auth from '../../utils/auth';
import UserAuthentication from '../../interfaces/authentication.interface';
import { login } from '../../services/User.service';
import logo from './../../assets/splash-image.png';
const initialState: LoggedUser = {
	email: '',
	password: '',
};

const LoginComponent = (props: UserAuthentication) => {
	const navigate = useNavigate();
	const [state, setState] = useState<LoggedUser>(initialState);

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setState((prevState) => ({
			...prevState,
			[name]: value,
		}));
	};

	const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		// const form = event.currentTarget;
		// const formData: FormData = new FormData(form);
		// const user = Object.fromEntries(formData);

		// console.log(state);
		const loginData = await login(state);
		if (loginData) {
			localStorage.setItem('accessToken', loginData.accessToken);

			props.setIsAuthenticated(true);
			auth.login(() => navigate('/user'));
		}
	};
	const validateForm = () => {
		return !state.email || !state.password;
	};
	return (
		<div className="login-container">
			<img
				src={logo}
				alt="logo image"
				height={50}
			/>
			<h1 style={{ textAlign: 'center' }}>Welcome</h1>
			<form
				onSubmit={handleSubmit}
				className="login-form">
				<label htmlFor="email">
					<b>Email</b>
				</label>
				<input
					type="email"
					placeholder="example@example.com"
					name="email"
					value={state.email}
					onChange={handleChange}
				/>

				<label htmlFor="password">
					<b>Password</b>
				</label>
				<input
					type="password"
					placeholder="XXXXXXXX"
					name="password"
					value={state.password}
					onChange={handleChange}
				/>
				<div>
					<div className="login-button">
						<button
							type="submit"
							disabled={validateForm()}>
							Login
						</button>
					</div>
					{/* <span className="or-text">or</span>
					<div className="google-button">
						<button type="submit">Sign in with Google</button>
					</div> */}
				</div>
			</form>
			<div>
				<p>
					Don't have an account?{' '}
					<span>
						<Link to="/register">Signup</Link>
					</span>
				</p>
			</div>
		</div>
	);
};

export default LoginComponent;
