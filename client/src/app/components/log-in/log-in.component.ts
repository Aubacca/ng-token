import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { User } from 'src/app/models/user';
import { AppState, selectAuthState } from 'src/app/store/auth.state';
import { LogIn } from 'src/app/store/auth.actions';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {
  user: User = new User();
  getState: Observable<any>;
  errorMessage: string | null;

  constructor(private store: Store<AppState>) {
    this.getState = this.store.select(selectAuthState);
  }

  ngOnInit() {
    this.getState.subscribe(state => {
      this.errorMessage = state.errorMessage;
    });
  }

  onSubmit(): void {
    const payload = {
      email: this.user.email,
      password: this.user.password
    };
    console.log(payload);
    this.store.dispatch(new LogIn(payload));
  }
}
