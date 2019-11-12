import { Injectable } from '@angular/core';
import { Resource } from '../resource';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';


const baseUrl = 'http://localhost:8080/Korera';
const getProjectResourcesUrl = baseUrl + '/project/getProjectResources/';
const addRowUrl = baseUrl + '/project/addField';
const addColUrl = baseUrl + '/project/addColumn/';
const resetResourceUrl = baseUrl + '/project/resetProjectResource/';
const resetColumnUrl = baseUrl + '/project/resetColumn/';
const getAllResourcesUrl = baseUrl + '/resource/getAllResources';

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

  pid: number;

  resetProjectResourcesUrl = baseUrl + '/resetProjectResource/' + this.pid;

  constructor(private http: HttpClient) { }

  getAllResources(): Observable<Resource[]> {
    return this.http.get<Resource[]>(getAllResourcesUrl, this.httpOptions);
  }
  getProjectResources(pid): Observable<Resource[]> {

    this.httpOptions = {
      headers: new HttpHeaders({
        // tslint:disable-next-line: max-line-length
        Authorization: 'Bearer ' + localStorage.getItem('token')
      })
    };

    console.log('calling get all resources');
    return this.http.get<Resource[]>(getProjectResourcesUrl + pid, this.httpOptions);
  }

  addRow(pid: number, res: Resource) {
    const newRow = '{\
      "pid": "' + pid + '",\
      "resourceName": "' + res.resourceName + '",\
      "resourceCode": "' + res.resourceCode + '",\
      "extraColsVal": "' + res.extraColsVal +  '"}';

    return this.http.post(addRowUrl, newRow, this.httpOptions);
  }

  addColumn(pid: number, colName: string, colType: string) {
    const newCol = '{\
      "colName": "' + colName + '",\
      "colType": "' + colType + '"}';

    return this.http.post(addColUrl + pid, newCol, this.httpOptions);
  }

  resetProjectResources(pid: number) {
    return this.http.delete(resetResourceUrl + pid, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  resetColumn(pid: number) {
    return this.http.delete(resetColumnUrl + pid, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  }


}
