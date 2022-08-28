import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {HttpError} from "../../models/http-error";


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


  constructor(public http: HttpClient) {
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
          console.log("POST SUCCESS /login", response)
          this.setHttpError(false, '')
        },
        error => {
          console.log("Post failed /login with the errors", error);
          this.setHttpError(true, 'Network Error')
          this.setHttpError(true, 'Username Already Exists')
          setTimeout(() => {
            this.setHttpError(false, '')
          }, 1000)
          if (error.status == 409) {
            console.log("User Name Already Exists");
            this.setHttpError(true, 'Username Already Exists')
          }
        },
      )
  }


  public setHttpError(state: boolean, msg: string) {
    this.http_error.next(new HttpError(state, msg));
  }


}
