import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  }),
  responseType: 'text' as 'json'
};

const options = {responseType: 'text'};

const loginUrl = 'http://localhost:8080/Korera/user/login';

@Injectable({
  providedIn: 'root',
})
export class LoginService {

  constructor(private http: HttpClient) { }

  login(credentials: any): Observable<string> {
    return this.http.post<string>(loginUrl, credentials, httpOptions);
  }

}
