import {Action, createReducer, on} from '@ngrx/store';
import {Game} from "../../../../models/game";
import * as gameActions from "../action/game.actions";

export const gameFeatureKey = 'game';

export interface GameState {
  game: Game;
}

export const initialState: GameState = {
  game: {}
};

export const gameReducer = createReducer(
  initialState,
  on(gameActions.insertGames,
    (state: GameState, {game}) => ({state, game})
  ),
);

export function game_reducer(state: GameState | undefined, action: Action): any {
  return gameReducer(state, action);
}
