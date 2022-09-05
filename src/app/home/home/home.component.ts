import {Component, OnInit} from '@angular/core';
import {LoginService} from "../../login/service/login.service";
import {Router} from "@angular/router";
import {select, Store} from "@ngrx/store";
import {UserState} from "../../login/store/reducer/login.reducer";
import {Observable} from "rxjs";
import {User} from "../../models/user";
import {selectUsers} from "../../login/store/selector/login.selectors";
import {addUser} from "../../login/store/action/login.actions";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  authenticated = false
  public user$: Observable<User>;

  constructor(private loginService: LoginService, public router: Router, public store: Store<UserState>) {
    this.loginService.authenticated.subscribe(auth => this.authenticated = auth);
    this.user$ = this.store.pipe(select(selectUsers));
  }

  ngOnInit(): void {
    this.user$.subscribe(
      user => {

        let my_user;
        let id;
        let img;
        let name;
        let token;
        if (user.id) {
          localStorage.setItem("id", String(user.id));
          localStorage.setItem("img", <string>user.img);
          localStorage.setItem("token", <string>user.token);
          localStorage.setItem("name", <string>user.name);
          this.authenticated = true
        } else {
          id = localStorage.getItem("id")
          img = localStorage.getItem("img")
          token = localStorage.getItem("token")
          name = localStorage.getItem("name")

          my_user = new User()
          my_user.id = Number(id)
          my_user.img = String(img)
          my_user.token = String(token)
          my_user.name = String(name)

          this.store.dispatch(addUser(my_user))
          this.authenticated = true
        }
      }
    )

  }

}
