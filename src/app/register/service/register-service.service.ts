import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from '../../../environments/environment'
import {HttpError} from "../../models/http-error";
import {BehaviorSubject} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class RegisterServiceService {

  public http_error = new BehaviorSubject(new HttpError(false, 'some error'));
  currentHttp_error = this.http_error.asObservable();

  constructor(public http: HttpClient) {
  }

  public getData() {
    this.http.get<any[]>(environment.base_api_url + 'auth').subscribe(
      data => {
        console.log("GOOD RESPONSE ==>", data)
      },
      error => {
        console.log("ERROR ==>", error)
      }
    )
  }

  public postData(name: string, password: string) {
    const headers = {'content-type': 'application/json'}
    const n = name.replace(" ", "")
    const first_char = n.charAt(0).toLowerCase()
    const body = JSON.stringify({'name': n, 'password': password, 'img': this.format_string(first_char)});

    this.http.post(environment.base_api_url + 'auth', body, {'headers': headers, observe: 'response'})
      .subscribe(
        response => {
          console.log("POST SUCCESS /auth", response)
          this.setHttpError(false, '')
        },
        error => {
          console.log("Post failed /auth with the errors", error);
          this.setHttpError(true, 'Network Error')
          this.setHttpError(true, 'Username Already Exists')
          setTimeout(() => {
            this.setHttpError(false, '')
          }, 1000)
          if (error.status == 409) {
            console.log("User Name Already Exists");
            this.setHttpError(true, 'Username Already Exists')
            setTimeout(() => {
              this.setHttpError(false, '')
            }, 1500)
          }
        },
      )
  }

  public setHttpError(state: boolean, msg: string) {
    this.http_error.next(new HttpError(state, msg));
  }

  public format_string(n: string) {
    return "https://i.pravatar.cc/250?u=fake@" + n + ".com"
  }


}
