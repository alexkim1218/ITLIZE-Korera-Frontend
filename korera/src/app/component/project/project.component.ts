import { Project } from '../../project';
import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../service/project.service';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { Observable, from, Subscription, Subject } from 'rxjs';
import { ProjectSelectorService } from 'src/app/service/project-selector.service';
import { take } from 'rxjs/internal/operators/take';


@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {

  projects: Project[];
  currentProject: Project;
  subscriptions: Subscription[] = [];
  private unsubscribe$ = new Subject<void>();

  constructor(
    private projectService: ProjectService,
    private projectSelectorService: ProjectSelectorService,
    private matIconRegistry: MatIconRegistry, 
    private domSanitizer: DomSanitizer) {
    this.matIconRegistry.addSvgIcon(
      "tick",
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/img/tick.svg")
    );
  }

  ngOnInit() {

  }

  submit() {
    this.subscriptions.push(this.projectService.resetProjectResources(this.projectSelectorService.currentProject.projectId).pipe(take(1))
    .subscribe(
      response => {
        console.log("Project resources has reset.")
        this.projectService._projectResources.forEach(resource => {
          this.projectService.addProjectResources(this.projectSelectorService.currentProject.projectId,resource.resourceId).pipe(take(1)).subscribe(response => {
            console.log("added one row in project")
          })
        })
      }
    ))


  }

}
