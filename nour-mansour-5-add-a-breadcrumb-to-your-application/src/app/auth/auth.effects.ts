import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import * as AuthActions from './auth.actions';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthEffects {
  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login),
      tap(() => console.log('Login action dispatched')),
      mergeMap((action) =>
        this.authService.login(action.username, action.password).pipe(
          tap(() => console.log('Login service call')),
          map((response) =>
            AuthActions.loginSuccess({
              authToken: response.authToken,
              username: response.username,
            })
          ),
          catchError((error) => {
            console.error('Login error:', error);
            return of(AuthActions.loginFailure({ error }));
          })
        )
      )
    )
  );

  storeAuthTokenInLocalStorage$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.setAuthToken),
        tap(({ authToken }) => localStorage.setItem('authToken', authToken))
      ),
    { dispatch: false }
  );

  logout$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.logout),
        tap(() => {
          // Remove the token from local storage
          localStorage.removeItem('authToken');
        })
      ),
    { dispatch: false }
  );

  // Additional effects can be added for token refresh, etc.

  constructor(private actions$: Actions, private authService: AuthService) {}
}
