import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { AppState } from './models/app.state';
import { Store, select } from '@ngrx/store';
import { tap, catchError, map } from 'rxjs/operators';
import CryptoJS from 'crypto-js';
import * as AuthActions from './auth/auth.actions';
import { environment } from './environments/environment';
import { ApiResponse } from './models/api-response.interface';
import { Router } from '@angular/router';
import { selectAuthToken, selectUserName } from './auth/auth.selectors';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = environment.apiUrl;
  private authTokenKey = 'authToken';
  private encryptionKey = 'aR3#b@2C9!zPxYq5sL8jG*1hU6mQnO';

  constructor(
    private http: HttpClient,
    private store: Store<AppState>,
    private router: Router
  ) {}

  private encrypt(data: string): string {
    return CryptoJS.AES.encrypt(data, this.encryptionKey).toString();
  }

  private decrypt(data: string): string {
    const bytes = CryptoJS.AES.decrypt(data, this.encryptionKey);
    return bytes.toString(CryptoJS.enc.Utf8);
  }

  private setAuthToken(authToken: string): void {
    const encryptedToken = this.encrypt(authToken);
    const secureCookie = environment.production; // Set to true if served over HTTPS

    // Set cookie expiration to 7 days (we can adjust as needed)
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + 7);

    // Set as HttpOnly cookie
    document.cookie = `${
      this.authTokenKey
    }=${encryptedToken}; HttpOnly; Secure=${secureCookie}; SameSite=Strict; Expires=${expirationDate.toUTCString()}`;

    // store in localStorage Directly
    // localStorage.setItem(this.authTokenKey, encryptedToken);

    // use NgRx
    this.setAuthTokenInLocalStorage(encryptedToken);
  }

  setAuthTokenInLocalStorage(authToken: string): void {
    this.store.dispatch(AuthActions.setAuthToken({ authToken }));
  }

  // isAuthenticated(): Observable<boolean> {
  //   return this.store.pipe(
  //     select(selectAuthToken),
  //     // tap((authToken) => console.log('Auth Token:', authToken)),
  //     map((authToken: string) => !!authToken && authToken.trim() !== '') // Check if not null and not empty
  //   );
  // }

  // isAuthenticated(): Observable<boolean> {
  //   const authToken = localStorage.getItem('authToken');
  //   return of(!!authToken && authToken.trim() !== '');
  // }

  isAuthenticated(): Observable<boolean> {
    return this.store.pipe(
      select(selectAuthToken),
      map((authToken: string) => {
        if (authToken && authToken.trim() !== '') {
          return true;
        } else {
          if (typeof localStorage !== 'undefined') {
            const localStorageToken = localStorage.getItem('authToken');
            return !!localStorageToken && localStorageToken.trim() !== '';
          } else {
            // Handle the case where localStorage is not available (e.g., during SSR)
            return false;
          }
        }
      })
    );
  }

  signUp(data: any): Observable<ApiResponse> {
    return this.http
      .post<ApiResponse>(`${this.apiUrl}/signup`, data)
      .pipe(catchError(this.handleError('Sign Up')));
  }

  login(username: string, password: string): Observable<ApiResponse> {
    // Check if the provided credentials match the expected values
    if (username === 'nour' && password === 'nour') {
      // If matched, return a response with a sample access token
      const fakeResponse: ApiResponse = {
        authToken: '1',
        username: username,
        password: password,
      };

      this.setAuthToken(fakeResponse.authToken);
      this.store.dispatch(
        AuthActions.loginSuccess({
          authToken: fakeResponse.authToken,
          username: fakeResponse.username,
        })
      );
      // console.log('Login successful:', fakeResponse);
      console.log('Login successful with Nour info');
      this.router.navigate(['/tasks']);

      return of(fakeResponse);
    } else {
      // If not matched, attempt real login using HTTP request
      return this.http
        .post<ApiResponse>(`${this.apiUrl}/login`, { username, password })
        .pipe(
          tap((response: ApiResponse) => {
            const authToken = response.authToken;
            this.setAuthToken(authToken);
            this.store.dispatch(
              AuthActions.loginSuccess({ authToken, username })
            );
            this.router.navigate(['/tasks']);
          }),
          catchError((error) => {
            this.store.dispatch(AuthActions.loginFailure({ error }));
            throw error;
          })
        );
    }
  }

  logout(): Observable<any> {
    // Dispatch logout action
    this.store.dispatch(AuthActions.logout());

    // Clear the HttpOnly cookie to log out
    document.cookie = `${this.authTokenKey}=; Max-Age=0; HttpOnly; Secure; SameSite=Strict`;

    // Call the server-side logout endpoint
    return this.http
      .post(
        `${this.apiUrl}/logout`,
        {},
        { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) }
      )
      .pipe(
        tap(() => {
          // Redirect to login page after successful logout
          this.router.navigate(['/home']);
        }),
        catchError(this.handleError('Logout'))
      );
  }

  deleteAccount(): Observable<any> {
    return this.http
      .delete(`${this.apiUrl}/delete-account`, {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      })
      .pipe(catchError(this.handleError('Delete Account')));
  }

  private handleError(operation: string) {
    return (error: HttpErrorResponse) => {
      if (error.error instanceof ErrorEvent) {
        console.error(`${operation} error: ${error.error.message}`);
      } else {
        console.error(
          `${operation} failed with code ${error.status}, body was: ${error.error}`
        );
      }
      return throwError(
        () => new Error('Something went wrong; please try again later.')
      );
    };
  }
}
