import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.css']
})
export class PlayComponent implements OnInit {

  counter = -1;

  constructor() {
  }

  ngOnInit(): void {
  }

  public async play(ch: number) {
    this.counter = 3

    // setTimeout(() => {
    //   this.decrese()
    // }, 1000)
    // setTimeout(() => {
    //   this.decrese()
    // }, 2000)
    // setTimeout(() => {
    //   this.decrese()
    // }, 3000)
    // setTimeout(() => {
    //   alert(a)
    // }, 4000)


    for (let i = 0; i < 3; i++) {
      await this.fx_fost_fx()
    }


    let a = Math.floor(Math.random() * (3 - 1 + 1)) + 1;
    alert(a)
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
