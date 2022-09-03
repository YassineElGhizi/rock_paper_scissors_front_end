import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Store} from "@ngrx/store";
import {GameState} from "../store/reducer/game.reducer";
import {environment} from "../../../../environments/environment";
import {Game} from "../../../models/game";
import {insertGames} from "../store/action/game.actions";

@Injectable({
  providedIn: 'root'
})
export class GameService {

  public lose = new BehaviorSubject(0);
  currentLose = this.lose.asObservable();
  public draw = new BehaviorSubject(0);
  currentDraw = this.lose.asObservable();
  public win = new BehaviorSubject(0);
  currentWin = this.lose.asObservable();
  public total_items = new BehaviorSubject(0);
  currentTotalItems = this.lose.asObservable();

  constructor(public http: HttpClient, public store: Store<GameState>) {
  }

  public set_lose(lose: number) {
    this.lose.next(lose)
  }

  public set_win(win: number) {
    this.win.next(win)
  }

  public set_draw(draw: number) {
    this.draw.next(draw)
  }

  public set_total_items(total: number) {
    this.total_items.next(total)
  }


  public getData(id: number | undefined) {
    console.log('ID ==', id)
    const headers = {'content-type': 'application/json'}
    this.http.get(environment.base_api_url + "game?id=" + id, {
      'headers': headers,
      observe: 'response'
    }).subscribe(
      res => {
        console.log('res =>', res.body)
        this.store.dispatch(insertGames(res.body as Game))
      }
    )
  }

}
