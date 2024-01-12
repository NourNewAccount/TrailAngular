import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    console.log('AuthGuard - Checking authentication status...');

    return this.authService.isAuthenticated().pipe(
      tap((authenticated) => {
        console.log('Is Authenticated:', authenticated);
        if (!authenticated) {
          console.log(
            'AuthGuard - User is not authenticated. Redirecting to login...'
          );
          this.router.navigate(['/home']);
        }
      })
    );
  }
}
