import {Component, OnInit} from '@angular/core';
import {LoginService} from "./service/login.service";
import {HttpError} from "../models/http-error";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public user_name?: string;
  public passwd?: string;
  public token?: string;
  public img?: string;
  public http_error = new HttpError(false, 'some error');

  constructor(public loginService: LoginService) {
    this.loginService.currentUserName.subscribe(n => this.user_name = n);
    this.loginService.currentPasswd.subscribe(pswd => this.passwd = pswd);

    this.loginService.currentHttp_error.subscribe(he => {
      this.http_error.status = he.status;
      this.http_error.msg = he.msg;
    })


  }


  public login() {
    this.loginService.postData(this.user_name, this.passwd)
  }


  ngOnInit(): void {
  }

}
