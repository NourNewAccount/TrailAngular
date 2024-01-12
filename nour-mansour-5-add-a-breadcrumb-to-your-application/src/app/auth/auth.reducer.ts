import { createReducer, on } from '@ngrx/store';
import * as AuthActions from './auth.actions';

export interface AuthState {
  authToken: string;
  username: string;
  error: any;
}

export const initialState: AuthState = {
  authToken: '',
  username: '',
  error: null,
};

export const authReducer = createReducer(
  initialState,
  on(AuthActions.setAuthToken, (state, { authToken }) => ({
    ...state,
    authToken: authToken,
    error: null, // Reset
  })),
  on(AuthActions.loginSuccess, (state, { authToken, username }) => ({
    ...state,
    authToken,
    username,
    error: null,
  })),
  on(AuthActions.loginFailure, (state, { error }) => ({
    ...state,
    authToken: '',
    username: '',
    error,
  })),
  on(AuthActions.logout, (state) => initialState)
);
