import {createFeatureSelector, createSelector} from '@ngrx/store';
import * as fromGame from "../reducer/game.reducer";


export const selectGameState = createFeatureSelector<fromGame.GameState>(
  fromGame.gameFeatureKey
);

export const selectGames = createSelector(
  selectGameState,
  (state: fromGame.GameState) => state.game
);

