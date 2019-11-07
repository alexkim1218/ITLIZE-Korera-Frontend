import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthenticationService } from '../../service/auth/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  
  constructor(private authService: AuthenticationService, private router: Router) { }

  onSubmit(f: NgForm) {
    // console.log(f.value);  // { first: '', last: '' }
    // console.log(f.valid);  // false

    if (f.valid) {
      this.authService.signup(f.value).subscribe(resp => {
        console.log('response signup: ' + resp);

        // If successful direct to login
        // tslint:disable-next-line: no-eval
        if (eval(resp)) {

          alert('Signup Successful');
          this.router.navigateByUrl('/login');
        } else {
          // alert that username already exists
          alert('Username already exists. Please try another username');
        }

      });
    }
  }
}
