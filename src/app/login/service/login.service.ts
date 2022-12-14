import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {environment} from "../../../environments/environment.prod";
import {HttpClient} from "@angular/common/http";
import {HttpError} from "../../models/http-error";
import {Store} from "@ngrx/store";
import {User} from "../../models/user";
import {ActivatedRoute, Router} from "@angular/router";
import {UserState} from "../store/reducer/login.reducer";
import {addUser} from "../store/action/login.actions";


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  public user_name = new BehaviorSubject('');
  currentUserName = this.user_name.asObservable();
  public passwd = new BehaviorSubject('');
  currentPasswd = this.passwd.asObservable();

  public http_error = new BehaviorSubject(new HttpError(false, 'some error'));
  currentHttp_error = this.http_error.asObservable();

  public authenticated = new BehaviorSubject(false);
  currentAuthenticated = this.authenticated.asObservable();

  constructor(public http: HttpClient, private route: ActivatedRoute, private router: Router, public store: Store<UserState>) {
  }

  public set_authenticated(decision: boolean) {
    this.authenticated.next(decision)
  }

  public set_user_name(name: string) {
    this.user_name.next(name);
  }

  public set_passwd(passd: string) {
    this.passwd.next(passd);
  }

  public postData(name: string | undefined, password: string | undefined) {

    const headers = {'content-type': 'application/json'}
    const body = JSON.stringify({'name': name, 'password': password});
    let x = new User();

    this.http.post(environment.base_api_url + 'login', body, {'headers': headers, observe: 'response'})
      .subscribe(
        response => {
          this.setHttpError(false, '')
          console.log("res data  /login ", response.body)
          let y = response.body as User
          x.name = y.name
          x.img = y.img
          x.token = y.token
          x.id = y.id
          this.store.dispatch(addUser(x))
          this.router.navigate(['/home'])
          this.authenticated.next(true)
        },
        error => {
          console.log("Post failed /login with the errors", error);
          this.setHttpError(true, 'Network Error')
          if (error.status == 401) {
            console.log("Wrong Credentials !!");
            this.setHttpError(true, 'Wrong Credentials !!')
          }

          setTimeout(() => {
            this.setHttpError(false, '')
          }, 1500)

        },
      )
  }

  public setHttpError(state: boolean, msg: string) {
    this.http_error.next(new HttpError(state, msg));
  }
}
