import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  constructor(public auth: AuthService, public router: Router) {}

  canActivate(): boolean {
    if (!this.auth.getToken()) {
      console.log(
        'AuthGuardService.canActivate>ERROR: no token found, user must authenticate!'
      );
      this.router.navigateByUrl('/log-in');
      return false;
    }
    console.log('AuthGuardService.canActivate>Token found, user can continue.');
    return true;
  }
}
