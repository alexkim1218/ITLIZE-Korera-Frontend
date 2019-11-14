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
const deleteAllResourcesUrl = baseUrl + '/resource/deleteAllResource';

@Injectable({
  providedIn: 'root',
})
export class ResourceService {

  // httpOptions = {
  //   headers: new HttpHeaders({
  //     // tslint:disable-next-line: max-line-length
  //     Authorization: 'Bearer ' + localStorage.getItem('token')
  //   })
  // };

  pid: number;

  resetProjectResourcesUrl = baseUrl + '/resetProjectResource/' + this.pid;

  constructor(private http: HttpClient) { }

  getAllResources(): Observable<Resource[]> {
    return this.http.get<Resource[]>(getAllResourcesUrl);
  }
  getProjectResources(pid): Observable<Resource[]> {
    console.log('calling get all resources');
    return this.http.get<Resource[]>(getProjectResourcesUrl + pid);
  }

  addRow(pid: number, res: Resource) {
    const newRow = '{\
      "pid": "' + pid + '",\
      "resourceName": "' + res.resourceName + '",\
      "resourceCode": "' + res.resourceCode + '",\
      "extraColsVal": "' + res.extraColsVal +  '"}';

    return this.http.post(addRowUrl, newRow);
  }

  addColumn(pid: number, colName: string, colType: string) {
    const newCol = '{\
      "colName": "' + colName + '",\
      "colType": "' + colType + '"}';

    return this.http.post(addColUrl + pid, newCol);
  }

  resetProjectResources(pid: number) {
    return this.http.delete(resetResourceUrl + pid);
  }

  resetColumn(pid: number) {
    return this.http.delete(resetColumnUrl + pid);
  }

  deleteAllResources() {
    return this.http.delete(deleteAllResourcesUrl);
  }

}
