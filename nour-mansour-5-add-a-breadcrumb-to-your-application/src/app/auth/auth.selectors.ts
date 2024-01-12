import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from './auth.reducer';

export const selectAuthState = createFeatureSelector<AuthState>('auth');

export const selectAuthToken = createSelector(
  selectAuthState,
  (state) => state.authToken
);

export const selectUserName = createSelector(
  selectAuthState,
  (state: AuthState) => state.username

);
