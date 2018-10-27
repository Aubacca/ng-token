import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of as observableOf } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';

import { AuthService } from '../services/auth.service';
import {
  AuthActionTypes,
  LogIn,
  LogInSuccess,
  LogInFailure,
  SignUp,
  SignUpSuccess,
  SignUpFailure
} from './auth.actions';
import * as authActions from './auth.actions';
import { Action } from '@ngrx/store';

@Injectable()
export class AuthEffects {
  constructor(
    private actions: Actions,
    private authService: AuthService,
    private router: Router
  ) {}

  @Effect()
  LogIn: Observable<any> = this.actions.pipe(
    ofType<authActions.LogIn>(AuthActionTypes.LOGIN),
    map((action: LogIn) => action.payload),
    switchMap(payload => {
      return this.authService.logIn(payload.email, payload.password).pipe(
        map(user => {
          console.log('Effects.LogIn: user=', user);
          return new LogInSuccess({
            token: user.token,
            email: payload.email
          });
        }),
        catchError(error => {
          console.log(error);
          return observableOf(new LogInFailure({ error: error }));
        })
      );
    })
  );

  @Effect({ dispatch: false })
  LogInSuccess: Observable<any> = this.actions.pipe(
    ofType<authActions.LogInSuccess>(AuthActionTypes.LOGIN_SUCCESS),
    tap(user => {
      console.log('Effect.logInSuccess>user=', user);
      localStorage.setItem('token', user.payload.token);
      this.router.navigateByUrl('/');
    })
  );

  @Effect({ dispatch: false })
  LogInFailure: Observable<any> = this.actions.pipe(
    ofType<authActions.LogInFailure>(AuthActionTypes.LOGIN_FAILURE)
  );

  @Effect()
  SignUp: Observable<any> = this.actions.pipe(
    ofType<authActions.SignUp>(AuthActionTypes.SIGNUP),
    map((action: SignUp) => action.payload),
    switchMap(payload => {
      return this.authService.signUp(payload.email, payload.password).pipe(
        map(user => {
          console.log('Effects.SignUp: user=', user);
          return new SignUpSuccess({
            token: user.token,
            email: payload.email
          });
        }),
        catchError(error => {
          console.log(error);
          return observableOf(new SignUpFailure({ error: error }));
        })
      );
    })
  );

  @Effect({ dispatch: false })
  SignUpSuccess: Observable<any> = this.actions.pipe(
    ofType<authActions.SignUpSuccess>(AuthActionTypes.SIGNUP_SUCCESS),
    tap(user => {
      console.log('Effect.signUpSuccess>user=', user);
      localStorage.setItem('token', user.payload.token);
      this.router.navigateByUrl('/');
    })
  );

  @Effect({ dispatch: false })
  SignUpFailure: Observable<any> = this.actions.pipe(
    ofType<authActions.SignUpFailure>(AuthActionTypes.SIGNUP_FAILURE)
  );

  @Effect({ dispatch: false })
  public LogOut: Observable<any> = this.actions.pipe(
    ofType<authActions.LogOut>(AuthActionTypes.LOGOUT),
    tap(user => {
      console.log('Effects.LogOut: user=', user);
      localStorage.removeItem('token');
    })
  );

  @Effect({ dispatch: false })
  GetStatus: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.GET_STATUS),
    switchMap(payload => {
      return this.authService.getStatus();
    })
  );
}
