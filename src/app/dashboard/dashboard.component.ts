import {Component, OnInit} from '@angular/core';
import {RankState} from "./store/reducer/rank.reducer";
import {Rank} from "../models/rank";
import {select, Store} from "@ngrx/store";
import {RankService} from "./service/rank.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  public rank: Rank[] | undefined;
  public render_navbar = true;

  constructor(private store: Store<RankState>, public rankService: RankService) {
    this.rankService.current_rank.subscribe(s => this.rank = s)
  }

  ngOnInit(): void {
    this.rankService.get_data();
    if(!localStorage.getItem("id")){
      this.render_navbar = false;
    }

  }

}
