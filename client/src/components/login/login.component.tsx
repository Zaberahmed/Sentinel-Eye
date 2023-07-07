import './login.component.css';
import { useState, ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoggedUser } from '../../interfaces/user.interface';

const initialState: LoggedUser = {
	email: '',
	password: '',
};
const LoginComponent = () => {
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
		const form = event.currentTarget;
		const formData: FormData = new FormData(form);
		const user = Object.fromEntries(formData);
		console.log(user);
	};
	const validateForm = () => {
		return !state.email || !state.password;
	};
	return (
		<div className="container">
			<h2 className="title">Login</h2>
			<form
				onSubmit={handleSubmit}
				className="form">
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
				<div className="login-button">
					<button
						type="submit"
						disabled={validateForm()}>
						Login
					</button>
				</div>
			</form>
			<span className="or-text">or</span>
			<div className="google-button">
				<button type="submit">Sign in with Google</button>
			</div>
		</div>
	);
};

export default LoginComponent;
