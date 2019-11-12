import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Project } from '../project';
import { Subject, Observable } from 'rxjs';
import { unescapeIdentifier } from '@angular/compiler';

const indexUrl = "http://localhost:8080/Korera";
const getProjectsUrl = indexUrl + "/project/getUserProjects";
const getDefaultProjectUrl = indexUrl + "/project/getDefaultProject"

@Injectable({
  providedIn: 'root'
})
export class ProjectSelectorService {

  // Observable of the current project
  currentProject : Project
  currentProject$: Observable<Project>;

  private currentProjectSubject: Subject<Project>;

  constructor(private _http: HttpClient) {
    this.currentProjectSubject = new Subject<Project>();
    this.currentProject$ = this.currentProjectSubject.asObservable();
  }

  httpOptions = {
    headers: new HttpHeaders({
      // tslint:disable-next-line: max-line-length
      Authorization: 'Bearer ' + localStorage.getItem('token')
    })
  };

  loadProjects(uid: number) {
    return this._http.get<Project[]>(getProjectsUrl + '/' + uid, this.httpOptions);
  }

  loadDefaultProject(uid: number){
    return this._http.get<Project>(getDefaultProjectUrl + '/' + uid, this.httpOptions);
  }

  changeCurrentProject(project: Project) {
    this.currentProject = project
    this.currentProjectSubject.next(project);
  }
}
