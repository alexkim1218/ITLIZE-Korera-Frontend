import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProjectService } from '../../service/project.service';
import { MatIconRegistry } from "@angular/material/icon";
import { DomSanitizer } from "@angular/platform-browser";
import { ProjectSelectorService } from 'src/app/service/project-selector.service';
import { take, flatMap } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-project-project',
  templateUrl: './project-project.component.html',
  styleUrls: ['./project-project.component.css']
})
export class ProjectProjectComponent implements OnInit {

  resources
  fields : string[] = ["resourceId", "resourceName", "resourceCode"]
  subscriptions : Subscription[] = []

  constructor(
    private projectService : ProjectService,
    private projectSelectorService : ProjectSelectorService, 
    private matIconRegistry: MatIconRegistry, 
    private domSanitizer: DomSanitizer
    ) {
    this.matIconRegistry.addSvgIcon(
      "trash",
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/img/trash.svg")
    );
    // this.resources = this.projectService._projectResources

  }
  
  ngOnInit() {
    this.subscriptions.push(
      this.projectService.getProjectResources(this.projectSelectorService.currentProject.projectId)
    .subscribe(resources => {
      this.projectService._projectResources = resources
      this.resources = resources
    }))

    this.subscriptions.push(
      this.projectSelectorService.getCurrentProjectObservable().pipe(
      flatMap(project => this.projectService.getProjectResources(project.projectId))
    ).subscribe(resources => {
      console.log("project change caught")
      this.projectService._projectResources = resources
      this.resources = resources
    }))

    this.subscriptions.push(
    this.projectService.projectResources$.subscribe(resources => {
      this.projectService._projectResources = resources
      this.resources = resources
    }))
  }

  delete() {
    this.projectService.delete()
  }

  checkboxChange(i) {
    this.projectService.projectCheckboxChange(i)
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe())
  }
}
