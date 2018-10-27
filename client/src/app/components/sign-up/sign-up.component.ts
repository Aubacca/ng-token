import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import { User } from 'src/app/models/user';
import { AppState, selectAuthState } from 'src/app/store/auth.state';
import { SignUp } from 'src/app/store/auth.actions';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  user: User = new User();
  getState: Observable<any>;
  errorMessage: string | null;

  constructor(private store: Store<AppState>) {
    this.getState = this.store.select(selectAuthState);
  }

  ngOnInit() {
    this.getState.subscribe(state => {
      console.log('SignUpComponent.onInit: state=', state);
      this.errorMessage = state.errorMessage;
    });
  }

  onSubmit(): void {
    const payload = { email: this.user.email, password: this.user.password };
    console.log('SignUp.onSubmit: payload=', payload);
    this.store.dispatch(new SignUp(payload));
  }
}
