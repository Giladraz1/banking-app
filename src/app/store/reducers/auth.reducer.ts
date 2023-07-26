import { createReducer, on } from '@ngrx/store';
import { login, loginSuccess, loginFailure, logout } from '../actions/auth.actions';

export interface AuthState {
  user: any;
  error: string;
}

export const initialState: AuthState = {
  user: null,
  error: '',
};

export const authReducer = createReducer(
  initialState,
  on(login, (state, { username, password }) => ({ ...state, user: null, error: '' })),
  on(loginSuccess, (state, { user }) => ({ ...state, user, error: '' })),
  on(loginFailure, (state, { error }) => ({ ...state, user: null, error })),
  on(logout, () => initialState)
);
