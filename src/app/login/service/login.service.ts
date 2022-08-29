import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {HttpError} from "../../models/http-error";
import {select, Store} from "@ngrx/store";
import {LoginState} from "../store/reducer/login.reducer";
import {selectLogin} from "../store/selector/login.selectors";
import {User} from "../../models/user";
import {addLogin} from "../store/action/login.actions";
import {ActivatedRoute, Router} from "@angular/router";


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  public user_name = new BehaviorSubject('');
  currentUserName = this.user_name.asObservable();
  public passwd = new BehaviorSubject('');
  currentPasswd = this.passwd.asObservable();

  user$: Observable<User>;

  public http_error = new BehaviorSubject(new HttpError(false, 'some error'));
  currentHttp_error = this.http_error.asObservable();


  constructor(public http: HttpClient, private store: Store<LoginState>, private route: ActivatedRoute, private router: Router) {
    this.user$ = this.store.pipe(select(selectLogin))
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

    this.http.post(environment.base_api_url + 'login', body, {'headers': headers, observe: 'response'})
      .subscribe(
        response => {
          this.setHttpError(false, '')
          console.log("data", response.body)
          let u = response.body as User;
          this.store.dispatch(addLogin(u));
          this.router.navigate(['/home'])
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
