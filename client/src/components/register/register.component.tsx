import './register.component.css';
import { useState, ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { RegisteredUser } from '../../interfaces/user.interface';
import { useGoogleLogin } from '@react-oauth/google';
import { useDispatch } from 'react-redux';
import { signup, signupGoogle } from '../../redux/actions/auth';
import { login, register } from '../../services/User.service';
import auth from '../../utils/auth';
import UserAuthentication from '../../interfaces/authentication.interface';

const initialState: RegisteredUser = {
	name: '',
	email: '',
	password: '',
	gender: '',
	age: '',
	address: '',
};

const RegisterComponent = (props: UserAuthentication) => {
	const navigate = useNavigate();

	const [state, setState] = useState<RegisteredUser>(initialState);

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setState((prevState) => ({
			...prevState,
			[name]: value,
		}));
	};
	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		// const form = e.currentTarget;
		// const formData: FormData = new FormData(form);

		// const user = Object.fromEntries(formData);
		// console.log(user);
		const registerData = await register(state);
		const loginData = await login(state);
		if (registerData && loginData) {
			localStorage.setItem('accessToken', loginData.accessToken);

			props.setIsAuthenticated(true);
			auth.login(() => navigate('/user'));
		}
	};

	const validateForm = (): boolean => {
		return !state.name || !state.email || !state.password;
	};
	return (
		<div className="register-container">
			<h2 className="title">Sign Up</h2>
			<form
				onSubmit={handleSubmit}
				className="register-form">
				<label htmlFor="name">
					<b>Name</b>
				</label>
				<input
					type="name"
					placeholder="John Doe"
					name="name"
					value={state.name}
					onChange={handleChange}
				/>
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

				<label className="gender-label">
					<b>Gender</b>
				</label>
				<div className="gender-options">
					<div className="gender-option">
						<input
							type="radio"
							id="male"
							name="gender"
							value="male"
							checked={state.gender === 'male'}
							onChange={handleChange}
						/>
						<label htmlFor="male">Male</label>
					</div>
					<div className="gender-option">
						<input
							type="radio"
							id="female"
							name="gender"
							value="female"
							checked={state.gender === 'female'}
							onChange={handleChange}
						/>
						<label htmlFor="female">Female</label>
					</div>
					<div className="gender-option">
						<input
							type="radio"
							id="other"
							name="gender"
							value="other"
							checked={state.gender === 'other'}
							onChange={handleChange}
						/>
						<label htmlFor="other">Other</label>
					</div>
				</div>

				<label htmlFor="address">
					<b>Address</b>
				</label>
				<input
					type="address"
					placeholder="Dhaka"
					name="address"
					value={state.address}
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

				<div className="register-button">
					<button
						type="submit"
						disabled={validateForm()}>
						Sign Up
					</button>
				</div>
				{/* <span className="or-text">or</span>
				<div className="google-button">
					<button type="submit">Sign in with Google</button>
				</div> */}
			</form>
		</div>
	);
};

export default RegisterComponent;
