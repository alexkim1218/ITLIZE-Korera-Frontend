import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthenticationService } from '../../service/auth/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  constructor(
    private authService: AuthenticationService,
    private router: Router
    ) { }

  credentials: string;
  user_name: string;
  rememberMe: boolean;

  ngOnInit() {
    // TODO: initialize username from localStorage
    // get current username if exist in local storage
    this.user_name = localStorage.getItem('username');
    // set to remember initially
    this.rememberMe = true;
  }

  onSubmit(f: NgForm) {
    // console.log(f.value);
    if (f.valid) {
      console.log(f.value);

      this.credentials = '{\
          "username": "' + f.value.username + '",\
          "password": "' + f.value.password +  '"}';

      this.authService.login(JSON.parse(this.credentials)).subscribe(resp => {
        console.log(resp);
        // TODO
        // IF NOT, login failed
        if (resp === 'failed') {
          alert('bad credentials');
        } else {
          if (f.value.rememberMe) {
            localStorage.setItem('username', f.value.username);
          }
          // SET TOKEN IF SUCCESSFUL
          localStorage.setItem('token', resp);
          this.router.navigateByUrl('/resource');
        }
      });
    } else {
      alert('Please fill out the required field!');
    }
  }

  log(x: string) {
    console.log(x);
  }
}
