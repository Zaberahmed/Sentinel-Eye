import './register.component.css';
import { useState, ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { RegisteredUser } from '../../interfaces/user.interface';
import { useGoogleLogin } from '@react-oauth/google';
import { useDispatch } from 'react-redux';
import { signup, signupGoogle } from '../../redux/actions/auth';

const initialState: RegisteredUser = {
	name: '',
	email: '',
	password: '',
	gender: '',
	age: '',
	address: '',
};
interface tokenResponse {
	access_token: string;
}
const RegisterComponent = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

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

		const form = e.currentTarget;
		const formData: FormData = new FormData(form);

		const user = Object.fromEntries(formData);
		console.log(user);
		dispatch(signup(user, navigate));
	};
	const handleGoogleLoginResponse = (tokenResponse: tokenResponse) => {
		const accessToken = tokenResponse.access_token;

		dispatch(signupGoogle(accessToken, navigate));
	};
	const validateForm = (): boolean => {
		return !state.name || !state.email || !state.password;
	};
	return (
		<div className="container">
			<h2 className="title">Register</h2>
			<form
				onSubmit={handleSubmit}
				className="form">
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
						Register
					</button>
				</div>
				<span className="or-text">or</span>
				<div className="google-button">
					<button
						type="submit"
						onClick={() => useGoogleLogin({ onSuccess: handleGoogleLoginResponse })}>
						Sign in with Google
					</button>
				</div>
			</form>
		</div>
	);
};

export default RegisterComponent;
