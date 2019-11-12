import { Project } from '../project';
import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Resource } from '../resource';

const indexUrl = "http://localhost:8080/Korera/"
const getProjectResourcesUrl = indexUrl + "project/getProjectResources"
const resetProjectResourcesUrl = indexUrl + "project/resetProjectResource"
const addProjectResourceUrl = indexUrl + "project/addProjectResource"

@Injectable({
  providedIn: 'root'
})

export class ProjectService {

  resourceResources;
  _projectResources = [];

  projectResources$: Observable<any>
  private projectResourcesSubject: Subject<any>

  httpOptions = {
    headers: new HttpHeaders({
      // tslint:disable-next-line: max-line-length
      Authorization: 'Bearer ' + localStorage.getItem('token')
    })
  };

  constructor(private _http: HttpClient) {
    this.projectResourcesSubject = new Subject<any>()
    this.projectResources$ = this.projectResourcesSubject.asObservable()
  }

  getProjectResources(pid: number) {
    return this._http.get<Resource[]>(getProjectResourcesUrl + "/" + pid, this.httpOptions)
  }

  resetProjectResources(pid: number) {
    return this._http.delete(resetProjectResourcesUrl + "/" + pid, this.httpOptions)
  }

  addProjectResources(pid: number, rid: number) {
    console.log(this.httpOptions)

    return this._http.post(addProjectResourceUrl + "/" + pid + "/" + rid, {}, this.httpOptions)
    
  }

  delete() {
    let i = 0
    while(i < this._projectResources.length){
      if(this._projectResources[i].checked) {
        this._projectResources.splice(i,1)
      } else {
        i ++
      }
    }
  }

  resourceCheckboxChange(i) {
    this.resourceResources[i].checked = !this.resourceResources[i].checked
  }

  projectCheckboxChange(i) {
    this._projectResources[i].checked = !this._projectResources[i].checked
  }

  import() {
    this.resourceResources.forEach((resource, index) => {
      if(resource.checked) {
      resource.checked = false
      let existed = false
      this._projectResources.forEach((resourceP, indexP) => {
        if(resource.resourceId == resourceP.resourceId) {
          existed = true
        }
      });
      if(existed == false) {
        this._projectResources.push(JSON.parse(JSON.stringify(resource)))
      }
    }
  });
    console.log(this._projectResources)
    this.projectResourcesSubject.next(this._projectResources)
  }

  selectAll() {
    this.resourceResources.forEach(resource => {
      resource.checked = true
    });
  }

  clearAll() {
    this.resourceResources.forEach(resource => {
      resource.checked = false
    });
  }

}
