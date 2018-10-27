import { TestBed, inject } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { AuthGuardService } from './auth-guard.service';
import { AuthService } from './auth.service';
import { RouterTestingModule } from '@angular/router/testing';

describe('AuthGuardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, RouterTestingModule],
      providers: [AuthGuardService, AuthService]
    });
  });

  it('should be created', inject(
    [AuthGuardService],
    (service: AuthGuardService) => {
      expect(service).toBeTruthy();
    }
  ));
});
