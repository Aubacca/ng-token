import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { reducers } from './store/auth.state';
import { AuthEffects } from './store/auth.effects';
import { AppRoutingModule } from './app-routing.module';
import { AuthService } from './services/auth.service';
import {
  TokenInterceptor,
  ErrorInterceptor
} from './services/token.interceptor';

import { AppComponent } from './app.component';
import { LogInComponent } from './components/log-in/log-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { LandingComponent } from './components/landing/landing.component';
import { StatusComponent } from './components/status/status.component';
import { AuthGuardService as AuthGuard } from './services/auth-guard.service';

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    SignUpComponent,
    LogInComponent,
    StatusComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    StoreModule.forRoot(reducers, {}),
    EffectsModule.forRoot([AuthEffects]),
    StoreDevtoolsModule.instrument({ maxAge: 80 })
  ],
  providers: [
    AuthService,
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
