import { Component, OnInit, Input } from '@angular/core';
import { ProjectService } from '../../service/project.service';
import { MatIconRegistry } from "@angular/material/icon";
import { DomSanitizer } from "@angular/platform-browser";
import { ProjectSelectorService } from 'src/app/service/project-selector.service';
import { mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-project-project',
  templateUrl: './project-project.component.html',
  styleUrls: ['./project-project.component.css']
})
export class ProjectProjectComponent implements OnInit {

  resources
  fields : string[] = ["resourceId", "resourceName", "resourceCode"]

  constructor(
    private projectService : ProjectService,
    private projectSelectorService : ProjectSelectorService, 
    private matIconRegistry: MatIconRegistry, 
    private domSanitizer: DomSanitizer
    ) {
    // this.projectService.projectResources$.subscribe((newResource) => {this.resources = newResource})
    this.matIconRegistry.addSvgIcon(
      "trash",
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/img/trash.svg")
    );
    this.resources = this.projectService._projectResources
  }
  
  ngOnInit() {
    this.resources = this.projectService._projectResources
    this.projectSelectorService.currentProject$.pipe(
      mergeMap(project => this.projectService.getProjectResources(project.projectId))
    ).subscribe(resources => this.resources = resources)
  }

  delete() {
    this.projectService.delete()
  }

  checkboxChange(i) {
    this.projectService.projectCheckboxChange(i)
  }
}
