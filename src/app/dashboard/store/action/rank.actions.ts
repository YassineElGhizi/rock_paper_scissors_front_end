import {createAction, props} from '@ngrx/store';
import {Rank} from "../../../models/rank";

export const loadRanks = createAction(
  '[Rank] Load Ranks',
  (rank: Rank) => ({rank})
);




