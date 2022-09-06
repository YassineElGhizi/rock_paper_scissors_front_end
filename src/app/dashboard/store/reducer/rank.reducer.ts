import {Action, createReducer, on} from '@ngrx/store';
import {Rank} from "../../../models/rank";
import * as RankActions from '../action/rank.actions'

export const rankFeatureKey = 'rank';

export interface RankState {
  rank: Rank[];
}

export const initialState: RankState = {
  rank: []
};

export const rankReducer = createReducer(
  initialState,
  on(
    RankActions.loadRanks,
    (state: RankState, {rank}) => ({
      ...state, rank: [...state.rank, rank]
    }))
);

export function rank_reducer(state: RankState | undefined, action: Action): any {
  return rankReducer(state, action);
}
