import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  }),
  responseType: 'text' as 'json'
};

const loginUrl = 'http://localhost:8080/Korera/user/login';
const signupUrl = 'http://localhost:8080/Korera/user/createUser';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {

  constructor(private http: HttpClient) { }

  login(credentials: any): Observable<string> {
    return this.http.post<string>(loginUrl, credentials, httpOptions);
  }

  signup(user: any): Observable<string> {
    return this.http.post<string>(signupUrl, user, httpOptions);
  }

}
