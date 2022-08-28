import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  public user_name = new BehaviorSubject('');
  currentUserName = this.user_name.asObservable();
  public passwd = new BehaviorSubject('');
  currentPasswd = this.passwd.asObservable();
  public token = new BehaviorSubject('');
  currentToken = this.token.asObservable();
  public img = new BehaviorSubject('');
  currentImg = this.img.asObservable();


  constructor() {
  }


  public set_user_name(name: string) {
    this.user_name.next(name);
  }

  public set_passwd(passd: string) {
    this.passwd.next(passd);
  }


}
