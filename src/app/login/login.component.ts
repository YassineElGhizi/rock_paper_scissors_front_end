import {Component, OnInit} from '@angular/core';
import {LoginService} from "./service/login.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user_name?: string;
  passwd?: string;
  token?: string;
  img?: string;


  constructor(public loginService: LoginService) {
    this.loginService.currentUserName.subscribe(n => this.user_name = n);
    this.loginService.currentPasswd.subscribe(pswd => this.passwd = pswd);
  }

  ngOnInit(): void {
  }

}
