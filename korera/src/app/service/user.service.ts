import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../user';

const userUrl = "http://localhost:8080/user"
const getUserUrl = userUrl + "/getUser"

@Injectable({
  providedIn: 'root'
})
export class UserService {

  httpOptions = {
    headers: new HttpHeaders({
      // tslint:disable-next-line: max-line-length
      Authorization: 'Bearer ' + localStorage.getItem('token')
    })
  };
  constructor(private _http: HttpClient) { }

  getUser() {
    return this._http.get<User>(getUserUrl,this.httpOptions)
  }
}
