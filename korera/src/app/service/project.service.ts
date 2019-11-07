import { Injectable } from '@angular/core';
import { Subject, Observable, BehaviorSubject } from 'rxjs';


export interface Project {
  projectId: number
  projectName: string
}

@Injectable({
  providedIn: 'root'
})

export class ProjectService {

  projects: Project[]
  currentProject: Project

  resourceFields;
  projectFields;
  resourceResources;
  _projectResources;

  projectResources$: Observable<any>
  private projectResourcesSubject: Subject<any>
  
  constructor() {
    this.projectResourcesSubject = new Subject<any>()
    this.projectResources$ = this.projectResourcesSubject.asObservable()
  }

  loadProject() {
    this.projects = [
      {projectId:1, projectName: "Project1"},
      {projectId:2, projectName: "Project2"},
      {projectId:3, projectName: "Project3"},
      {projectId:4, projectName: "Project4"},
    ]
  }
  
  getResourceFields() {
    this.resourceFields = ["resourceId", "PROJECT NAME", "PROJECT CODE"]
  }
  getProjectFields() {
    this.projectFields = ["resourceId", "PROJECT NAME", "PROJECT CODE"]
  }
  getResourceResources() {
    this.resourceResources = [{resourceId: 1, "PROJECT NAME": "qwer", "PROJECT CODE":"123"}, {resourceId: 2, "PROJECT NAME": "asdf", "PROJECT CODE":"456"}]
  }
  getProjectResources() {
    this._projectResources = [{resourceId: 1, "PROJECT NAME": "qwer", "PROJECT CODE":"123"}]
    this.projectResourcesSubject.next(this._projectResources)
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