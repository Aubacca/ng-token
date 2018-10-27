import { GetStatus } from './../../store/auth.actions';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { AppState } from 'src/app/store/auth.state';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.css']
})
export class StatusComponent implements OnInit {
  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.store.dispatch(new GetStatus());
  }
}
