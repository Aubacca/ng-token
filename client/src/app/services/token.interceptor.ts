import { Injectable, Injector } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse
} from '@angular/common/http';
import { Router } from '@angular/router';

import { Observable, of } from 'rxjs';

import { AuthService } from './auth.service';
import { catchError } from 'rxjs/operators';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  private _authService: AuthService;

  constructor(private injector: Injector) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this._authService = this.injector.get(AuthService);
    const token: string = this._authService.getToken();
    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
        'Blue-Baluu': 'confirmed'
      }
    });
    return next.handle(request);
  }
}

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private router: Router) {}
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(catchError((error, caught) => {
      // intercept the respons error and displace it to the console
      console.log(error);
      this.handleAuthError(error);
      return of(error);
    }) as any);
  }

  /**
   * manage errors
   * @param err
   * @returns {any}
   */
  private handleAuthError(err: HttpErrorResponse): Observable<any> {
    // handle your auth error or rethrow
    if (err.status === 401) {
      // navigate /delete cookies or whatever
      console.log('handled error ' + err.status);
      localStorage.removeItem('token');
      this.router.navigate([`/log-in`]);
      // if you've caught / handled the error, you don't want to rethrow
      // it unless you also want downstream consumers to have to handle it as well.
      return of(err.message);
    }
    throw err;
  }

  // @Injectable()
  // export class ErrorInterceptorOrg implements HttpInterceptor {
  // constructor(private router: Router) { }
  // intercept(
  //   request: HttpRequest < any >,
  //   next: HttpHandler
  // ): Observable < HttpEvent < any >> {
  //   return next.handle(request).catch((response: any) => {
  //     if (response instanceof HttpErrorResponse && response.status === 401) {
  //       localStorage.removeItem('token');
  //       this.router.navigateByUrl('/log-in');
  //     }
  //     return Observable.throw(response);
  //   });
  // }
}
