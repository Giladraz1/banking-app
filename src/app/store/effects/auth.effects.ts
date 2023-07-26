import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';
import { AuthService } from '../../services/auth.service';
import { login, loginSuccess, loginFailure } from '../actions/auth.actions';
import { Router } from '@angular/router';

@Injectable()
export class AuthEffects {
  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(login),
      switchMap(({ username, password }) =>
        this.authService.login(username, password).pipe(
          map(user => {
            this.router.navigate(['/main']);
            return loginSuccess({ user });
          }),
          catchError(error => {
            let errorMessage = '';
            if (error.status === 0) {
              // Network error
              errorMessage = 'זמנית לא ניתן......';
            } else if (error.error) {
              // Server returned an error message
              errorMessage = error.error.message;
            } else {
              // Unknown error
              errorMessage = 'An unknown error occurred.';
            }
            return of(loginFailure({ error: errorMessage }));
          })
        )
      )
    )  
  );

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router
  ) {}
}
