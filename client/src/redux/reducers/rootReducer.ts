import { combineReducers } from 'redux';
import { authReducer } from './authReducer.ts';
export const rootReducer = combineReducers(authReducer);
