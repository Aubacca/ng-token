import { AuthActions, AuthActionTypes } from './auth.actions';
import { User } from '../models/user';

export interface State {
  // is a user authenticated?
  isAuthenticated: boolean;
  // if authenticated, there should be a user object
  user: User | null;
  // error message
  errorMessage: string | null;
}

export const initialState: State = {
  isAuthenticated: false,
  user: null,
  errorMessage: null
};

export function reducer(state = initialState, action: AuthActions): State {
  console.log('reducer: state=', state, ', action=', action);
  switch (action.type) {
    case AuthActionTypes.LOGIN_SUCCESS: {
      return {
        ...state,
        isAuthenticated: true,
        user: {
          token: action.payload.token,
          email: action.payload.email
        },
        errorMessage: null
      };
    }

    case AuthActionTypes.LOGIN_FAILURE: {
      return {
        ...state,
        errorMessage: 'LOGIN_FAILURE: Incorrect email and/or password.'
      };
    }

    case AuthActionTypes.SIGNUP_SUCCESS: {
      return {
        ...state,
        isAuthenticated: true,
        user: {
          token: action.payload.token,
          email: action.payload.email
        },
        errorMessage: null
      };
    }

    case AuthActionTypes.SIGNUP_FAILURE: {
      return {
        ...state,
        errorMessage: 'SIGNUP_FAILURE: That email is already in use.'
      };
    }

    case AuthActionTypes.LOGOUT: {
      return initialState;
    }

    default: {
      return state;
    }
  }
}
