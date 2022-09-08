import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {Rank} from "../../models/rank";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment.prod";

@Injectable({
  providedIn: 'root'
})
export class RankService {

  public rank = new BehaviorSubject([]);
  current_rank = this.rank.asObservable();

  constructor(public http: HttpClient) {
  }

  public set_rank(rank: never[]) {
    this.rank.next(rank);
  }

  public get_data() {
    const headers = {'content-type': 'application/json'}
    this.http.get(environment.base_api_url + "ranking",
      {'headers': headers, observe: 'response'}).subscribe(
      res => {
        console.log("Ranking =>", res.body)
        this.set_rank(res.body as any)
      }
    );
  }

}
