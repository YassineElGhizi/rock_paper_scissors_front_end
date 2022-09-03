import {Component, OnInit} from '@angular/core';
import {LoginService} from "../../login/service/login.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  authenticated = false

  constructor(private loginService: LoginService, public router: Router) {
    this.loginService.authenticated.subscribe(auth => this.authenticated = auth);
  }

  ngOnInit(): void {
  }

}
