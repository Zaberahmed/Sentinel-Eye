import { Dispatch } from 'redux';
import { AUTH } from './actionTypes';
import * as api from './../../services/api.service';
import { NavigateFunction } from 'react-router-dom';
import { LoggedUser, RegisteredUser } from '../../interfaces/user.interface';

// export const loadUser = () => async (dispatch: Dispatch) => {
// 	const localUser = JSON.parse(localStorage.getItem('accessToken'));

// 	if (localUser) {
// 		dispatch({ type: AUTH, data: localUser });
// 	}
// };

export const signin = (data2: LoggedUser, navigate: NavigateFunction) => async (dispatch: Dispatch) => {
	try {
		const { data } = await api.signIn(data2);

		dispatch({ type: AUTH, data });
		navigate('/');
	} catch (err) {
		console.log(err);
	}
};

export const signinGoogle = (accessToken: string, navigate: NavigateFunction) => async (dispatch: Dispatch) => {
	try {
		// login user
		const { data } = await api.signInGoogle(accessToken);

		dispatch({ type: AUTH, data });
		navigate('/');
	} catch (err) {
		console.log(err);
	}
};

export const signup = (formData: RegisteredUser, navigate: NavigateFunction) => async (dispatch: any) => {
	try {
		// signup user
		const { data } = await api.signUp(formData);

		dispatch({ type: AUTH, data });
		navigate('/');
	} catch (err) {
		console.log(err);
	}
};

export const signupGoogle = (accessToken: string, navigate: NavigateFunction) => async (dispatch: any) => {
	try {
		// signup user
		const { data } = await api.signUpGoogle(accessToken);

		dispatch({ type: AUTH, data });
		navigate('/');
	} catch (err) {
		console.log(err);
	}
};
