import * as auth from './auth.reducer';
import { createFeatureSelector } from '@ngrx/store';

export interface AppState {
  authState: auth.State;
}

export const reducers = {
  auth: auth.reducer
};

export const selectAuthState = createFeatureSelector<AppState>('auth');
