import { Injectable } from '@angular/core';
import { Resource } from '../resource';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    // tslint:disable-next-line: max-line-length
    Authorization: 'Bearer eyJhbGciOiJIUzUxMiJ9.'
     + 'eyJzdWIiOiJhYmMxMjNAZ21haWwuY29tIiwiZXhwIjoxNTcyOTg3MTIxLCJpYXQiOjE1NzI5NjkxMjF9.'
     + 'kz2tM01KEWNnF1IJFYfjpcqGeMqiihw6Dlc89_MZ4Zg6DusauLzZvotitMZQncQzIUV03A35fq9rQxxBLMWBow'
  })
};

const getAllResourceUrl = 'http://localhost:8080/Korera/resource/getAllResources';

@Injectable({
  providedIn: 'root',
})
export class ResourceService {

  constructor(private http: HttpClient) { }

  getAllResources(): Observable<Resource[]> {
    console.log('calling get all resources');
    return this.http.get<Resource[]>(getAllResourceUrl, httpOptions);
  }

}
