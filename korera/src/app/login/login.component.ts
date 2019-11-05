import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoginService } from './login.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private loginService: LoginService) { }

  credentials: string;
  onSubmit(f: NgForm) {
    if (f.valid) {
      console.log(f.value.username);
      console.log(f.value.password);

      this.credentials = '{\
          "username": "' + f.value.username + '",\
          "password": "' + f.value.password +  '"}';

      console.log(JSON.parse(this.credentials));
      this.loginService.login(JSON.parse(this.credentials)).subscribe(resp => {
        console.log(resp);
        // TODO
        // SET TOKEN IF SUCCESSFUL
        // IF NOT, login failed
      });
    }
  }

  log(x: string) {
    console.log(x);
  }
}
