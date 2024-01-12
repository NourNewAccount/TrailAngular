import * as fromAuth from '../auth/auth.reducer';

export interface AppState {
  auth: fromAuth.AuthState;
  // Add other feature/module states here if needed
}

export const initialAppState: AppState = {
  //   auth: fromAuth.initialAuthState,
  auth: fromAuth.initialState,
  // Initialize other feature/module states here if needed
};
