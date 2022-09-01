import {Action, createReducer, on} from '@ngrx/store';
import * as UserActions from '../action/login.actions';
import {User} from "../../../models/user";

export const userFeatureKey = 'user';

export interface UserState {
  user: User;
}

export const initialState: UserState = {
  user: {}
};


export const userReducer = createReducer(
  initialState,
  on(UserActions.addUser,
    (state: UserState, {user}) => ({state, user})
  )
);


export function reducer(state: UserState | undefined, action: Action): any {
  return userReducer(state, action);
}
