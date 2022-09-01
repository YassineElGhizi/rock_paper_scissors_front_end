import {Component, OnInit} from '@angular/core';

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


  constructor() {
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

    console.log('1: ', this.bot_choice)
    await this.bot_generate()
    console.log('2: ', this.bot_choice)
    await this.my_switch_case(ch)
    console.log('3: ', this.bot_choice)


  }

  public my_switch_case(x: number) {
    switch (x) {
      case 1:
        if (this.bot_choice == 1) {
          this.resutls.color = 'black'
          this.resutls.txt = 'Draw +0'
          this.last_win = false
        }
        if (this.bot_choice == 2) {
          this.resutls.color = 'red'
          this.resutls.txt = 'Lost -1'
          this.last_win = false
        }
        if (this.bot_choice == 3) {
          this.resutls.color = 'green'
          this.resutls.txt = 'WIN +1'
          this.last_win = true
        }
        break;
      case 2:
        if (this.bot_choice == 2) {
          this.resutls.color = 'black'
          this.resutls.txt = 'Draw +0'
          this.last_win = false
        }
        if (this.bot_choice == 3) {
          this.resutls.color = 'red'
          this.resutls.txt = 'Lost -1'
          this.last_win = false
        }
        if (this.bot_choice == 1) {
          this.resutls.color = 'green'
          this.resutls.txt = 'WIN +1'
          this.last_win = true
        }
        break;
      case 3:
        if (this.bot_choice == 3) {
          this.resutls.color = 'black'
          this.resutls.txt = 'Draw +0'
          this.last_win = false
        }
        if (this.bot_choice == 1) {
          this.resutls.color = 'red'
          this.resutls.txt = 'Lost -1'
          this.last_win = false
        }
        if (this.bot_choice == 2) {
          this.resutls.color = 'green'
          this.resutls.txt = 'WIN +1'
          this.last_win = true
        }
        break;
      default:
        alert('Error Logic');
        break;
    }
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
