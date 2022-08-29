import {Action, createReducer, on} from '@ngrx/store';
import * as LoginAction from '../action/login.actions';
import {User} from "../../../models/user";

export const loginFeatureKey = 'login';

export interface LoginState {
  user: User
}

export const initialState: LoginState = {
  user: {'name': '', 'token': '', 'img': ''}
};

export const loginreducer = createReducer(
  initialState,
  on(LoginAction.addLogin,
    (state: LoginState, {user}) => ({state, user})
  )
);


export function reducer(state: LoginState | undefined, action: Action): any {
  return loginreducer(state, action);
}
