import {createFeatureSelector, createSelector} from '@ngrx/store';
import * as fromRank from '../reducer/rank.reducer';

export const selectRankState = createFeatureSelector<fromRank.RankState>(
  fromRank.rankFeatureKey
);

export const selectRank = createSelector(
  selectRankState,
  (state: fromRank.RankState) => state.rank
);
