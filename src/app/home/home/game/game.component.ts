import {Component, OnInit} from '@angular/core';
import {Chart, registerables} from "chart.js";


@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  chart: any = []

  constructor() {
    Chart.register(...registerables)
  }

  ngOnInit(): void {
    this.chart = new Chart('canvas', {
      type: 'doughnut',
      data: {
        labels: ['Win', 'Draw', 'Lose'],
        datasets: [{
          label: '# of Votes',
          data: [12, 19, 3,],
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
