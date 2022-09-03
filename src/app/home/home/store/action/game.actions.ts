import {createAction, props} from '@ngrx/store';
import {Game} from "../../../../models/game";


export const insertGames = createAction(
  '[Game] Insert Games',
  (game: Game) => ({game})
);

export const getGames = createAction(
  '[Game] Get Games'
);




