import {Component, OnInit} from '@angular/core';
import {select, Store} from "@ngrx/store";
import {UserState} from "../../../../login/store/reducer/login.reducer";
import {selectUsers} from "../../../../login/store/selector/login.selectors";
import {User} from "../../../../models/user";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../../environments/environment";
import {GameService} from "../../service/game.service";

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.css']
})
export class PlayComponent implements OnInit {

  counter = -1;
  resutls = {'txt': '', 'color': ''};
  hide_vs = false;
  bot_choice = -1;
  last_win = false;

  public user: Observable<User>

  constructor(private store: Store<UserState>, public http: HttpClient, public gameService: GameService) {
    this.user = this.store.pipe(select(selectUsers));
  }

  ngOnInit(): void {
  }

  public async play(ch: number) {
    this.hide_vs = true
    this.counter = 3
    this.resutls = {'txt': '', 'color': ''};

    for (let i = 0; i < 4; i++) {
      await this.fx_fost_fx()
    }

    await this.bot_generate()
    await this.my_switch_case(ch)
  }

  public my_switch_case(x: number) {
    switch (x) {
      case 1:
        if (this.bot_choice == 1) {
          this.resutls.color = 'black'
          this.resutls.txt = 'Draw +0'
          this.last_win = false
          this.postResults(0)
        }
        if (this.bot_choice == 2) {
          this.resutls.color = 'red'
          this.resutls.txt = 'Lost -1'
          this.last_win = false
          this.postResults(-1)
        }
        if (this.bot_choice == 3) {
          this.resutls.color = 'green'
          this.resutls.txt = 'WIN +1'
          this.last_win = true
          this.postResults(1)
        }
        break;
      case 2:
        if (this.bot_choice == 2) {
          this.resutls.color = 'black'
          this.resutls.txt = 'Draw +0'
          this.last_win = false
          this.postResults(0)
        }
        if (this.bot_choice == 3) {
          this.resutls.color = 'red'
          this.resutls.txt = 'Lost -1'
          this.last_win = false
          this.postResults(-1)
        }
        if (this.bot_choice == 1) {
          this.resutls.color = 'green'
          this.resutls.txt = 'WIN +1'
          this.last_win = true
          this.postResults(1)
        }
        break;
      case 3:
        if (this.bot_choice == 3) {
          this.resutls.color = 'black'
          this.resutls.txt = 'Draw +0'
          this.last_win = false
          this.postResults(0)
        }
        if (this.bot_choice == 1) {
          this.resutls.color = 'red'
          this.resutls.txt = 'Lost -1'
          this.last_win = false
          this.postResults(-1)
        }
        if (this.bot_choice == 2) {
          this.resutls.color = 'green'
          this.resutls.txt = 'WIN +1'
          this.last_win = true
          this.postResults(1)
        }
        break;
      default:
        alert('Error Logic');
        break;
    }
  }

  public postResults(decision: number) {
    let u = new User();
    this.user.subscribe(user => {
      u.id = user.id;
      u.name = user.name;
      u.img = user.img;
      u.token = user.token;
    })

    const headers = {'content-type': 'application/json', 'token': u.token as string}
    let game_score = {'user_id': u.id, 'user_name': u.name, 'game_score': decision}

    this.http.post(environment.base_api_url + 'game', JSON.stringify(game_score), {
      'headers': headers,
      observe: 'response'
    }).subscribe(
      response => this.gameService.getData(u.id)
    )

  }

  public bot_generate() {
    this.bot_choice = Math.floor(Math.random() * (3 - 1 + 1)) + 1;
  }

  public decrese() {
    this.counter -= 1;
  }


  public fx_fost_fx() {
    const interval = setTimeout(() => {
      this.counter--
    }, 1000);
    return this.promiseSetTimeout(() => clearInterval(interval), 1000);
  }

  // Util function to call a function later, and return a Promise
  public promiseSetTimeout(fun: any, time: any) {
    return new Promise(resolve => setTimeout(() => [fun, resolve].forEach(x => x.call()), time));
  }

}
