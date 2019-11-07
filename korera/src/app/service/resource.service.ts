import { Injectable } from '@angular/core';
import { Resource } from '../resource';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';



const getAllResourceUrl = 'http://localhost:8080/Korera/resource/getAllResources';

@Injectable({
  providedIn: 'root',
})
export class ResourceService {
  httpOptions = {
    headers: new HttpHeaders({
      // tslint:disable-next-line: max-line-length
      Authorization: 'Bearer ' + localStorage.getItem('token')
    })
  };
  constructor(private http: HttpClient) { }

  getAllResources(): Observable<Resource[]> {

    this.httpOptions = {
      headers: new HttpHeaders({
        // tslint:disable-next-line: max-line-length
        Authorization: 'Bearer ' + localStorage.getItem('token')
      })
    };

    console.log('calling get all resources');
    return this.http.get<Resource[]>(getAllResourceUrl, this.httpOptions);
  }

}
