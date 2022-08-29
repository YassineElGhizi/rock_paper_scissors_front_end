import {createAction} from '@ngrx/store';
import {User} from "../../../models/user";

export const addLogin = createAction(
  '[Login] Add Login',
  (user: User) => ({user})
);




