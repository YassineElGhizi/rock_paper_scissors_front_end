import {Component, OnInit} from '@angular/core';
import {RankState} from "./store/reducer/rank.reducer";
import {Observable} from "rxjs";
import {Rank} from "../models/rank";
import {select, Store} from "@ngrx/store";
import {selectRank} from "./store/selector/rank.selectors";
import {RankService} from "./service/rank.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  public rank: Rank[] | undefined;

  constructor(private store: Store<RankState>, public rankService: RankService) {
    this.rankService.current_rank.subscribe(s => this.rank = s)
  }

  ngOnInit(): void {
    this.rankService.get_data();
  }

}
