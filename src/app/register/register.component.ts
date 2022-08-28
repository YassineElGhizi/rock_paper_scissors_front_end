import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {Flash} from "../models/flash";
import {RegisterServiceService} from "./service/register-service.service";
import {HttpError} from "../models/http-error";
import {ActivatedRoute, Router} from '@angular/router';
import {LoginService} from "../login/service/login.service";


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public user_name?: Observable<string>;
  public password?: Observable<string>;
  public confirm_password?: Observable<string>;
  public error = new Flash('', '');
  public reset_error = true;
  public http_error = new HttpError(false, 'some error');
  public acount_created = false;


  constructor(public registerServiceService: RegisterServiceService, private route: ActivatedRoute, private router: Router, public loginService: LoginService) {
    this.registerServiceService.currentHttp_error.subscribe(he => {
      this.http_error.status = he.status;
      this.http_error.msg = he.msg;
    })
  }

  public create_account(user_name: string, password: string, confirm_password: string) {
    this.reset_error = true;
    if (password === confirm_password) {
      if (password === '') {
        this.error.key = "password";
        this.error.msg = "This Field is Required";
        this.reset_error = false;
      }
      if (user_name === '') {
        this.error.key = "user_name";
        this.error.msg = "This Field is Required";
        this.reset_error = false;
      }
    } else {
      this.error.key = "password";
      this.error.msg = "Password Doesn't match!";
      this.reset_error = false;
    }

    if (this.reset_error) {
      this.error.key = "";
      this.error.msg = "";
      this.registerServiceService.postData(user_name, password)
      if (!this.http_error.status) {
        this.acount_created = true
        this.loginService.set_passwd(password)
        this.loginService.set_user_name(user_name)
        setTimeout(() => {
          this.router.navigate([''])
        }, 1200);
      }
    }


  }

  ngOnInit(): void {
  }

}
