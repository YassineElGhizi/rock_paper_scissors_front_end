import {Component, OnInit} from '@angular/core';
import {Chart, registerables} from "chart.js";
import {GameService} from "../service/game.service";
import {select, Store} from "@ngrx/store";
import {UserState} from "../../../login/store/reducer/login.reducer";
import {selectUsers} from "../../../login/store/selector/login.selectors";
import {distinctUntilChanged, Observable} from "rxjs";
import {User} from "../../../models/user";
import {GameState} from "../store/reducer/game.reducer";
import {Game} from "../../../models/game";
import {selectGames} from "../store/selector/game.selectors";


@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  chart: any = []

  public user: Observable<User>;
  public game$: Observable<Game>;

  constructor(public gameService: GameService, public store: Store<UserState>, public game_store: Store<GameState>) {
    this.user = this.store.pipe(select(selectUsers));
    this.game$ = this.game_store.pipe(select(selectGames));
    Chart.register(...registerables)

    this.game$.pipe(distinctUntilChanged()).subscribe(data => this.hamza())

  }


  ngOnInit(): void {
    let id: number | undefined;
    this.user.subscribe(
      user => {
        id = user.id
      }
    )
    console.log("#1")
    this.gameService.getData(id)
    console.log("#2")
    let win: number | undefined;
    let draw: number | undefined;
    let lose: number | undefined;

    this.game$.subscribe(
      game => {
        win = game.win
        draw = game.draw
        lose = game.lose
      }
    )

    setTimeout(() => {
      this.chart = new Chart('canvas', {
        type: 'doughnut',
        data: {
          labels: ['Win', 'Draw', 'Lose'],
          datasets: [{
            label: '# of Votes',
            data: [win, draw, lose],
            backgroundColor: [
              '#18da7b',
              '#179af8',
              'rgba(255,20,147,0.93)',
            ],
            borderColor: [
              '#39c7c7',
              '#1e9df3',
              '#FF1493',
            ],
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
              display: false
            }
          }
        }
      })
    }, 300)
  }


  public hamza() {
    this.chart.destroy()

    let win: number | undefined;
    let draw: number | undefined;
    let lose: number | undefined;

    this.game$.subscribe(
      game => {
        win = game.win
        draw = game.draw
        lose = game.lose
      }
    )

    this.chart = new Chart('canvas', {
      type: 'doughnut',
      data: {
        labels: ['Win', 'Draw', 'Lose'],
        datasets: [{
          label: '# of Votes',
          data: [win, draw, lose],
          backgroundColor: [
            '#4BC0C0',
            '#36A2EB',
            '#FF6384',
          ],
          borderColor: [
            '#39c7c7',
            '#1e9df3',
            '#ff3762',
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            display: false
          }
        }
      }
    })
  }

}

