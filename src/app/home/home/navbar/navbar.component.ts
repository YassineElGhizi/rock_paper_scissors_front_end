import {Component, OnInit} from '@angular/core';
import {select, Store} from "@ngrx/store";
import {UserState} from "../../../login/store/reducer/login.reducer";
import {Observable} from "rxjs";
import {User} from "../../../models/user";
import {selectUsers} from "../../../login/store/selector/login.selectors";
import {LoginService} from "../../../login/service/login.service";
import {Router} from "@angular/router";
import {logout} from "../../../login/store/action/login.actions";


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  public user: Observable<User>

  constructor(private store: Store<UserState>, private loginService: LoginService, public router: Router) {
    this.user = this.store.pipe(select(selectUsers));
  }

  ngOnInit(): void {
  }

  public logout() {
    this.store.dispatch(logout());
    localStorage.clear();
    this.loginService.set_authenticated(false);
    this.router.navigate(["/"]);
  }

}
