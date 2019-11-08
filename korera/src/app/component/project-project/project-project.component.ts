import { Component, OnInit, Input } from '@angular/core';
import { ProjectService } from '../../service/project.service';
import { MatIconRegistry } from "@angular/material/icon";
import { DomSanitizer } from "@angular/platform-browser";

@Component({
  selector: 'app-project-project',
  templateUrl: './project-project.component.html',
  styleUrls: ['./project-project.component.css']
})
export class ProjectProjectComponent implements OnInit {

  resources
  fields

  constructor(private projectService : ProjectService, private matIconRegistry: MatIconRegistry, private domSanitizer: DomSanitizer) {
    this.projectService.projectResources$.subscribe((newResource) => {this.resources = newResource})
    this.matIconRegistry.addSvgIcon(
      "trash",
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/img/trash.svg")
    );
  }
  
  ngOnInit() {
    this.projectService.getProjectFields()
    this.projectService.getProjectResources()
    this.resources = this.projectService._projectResources
    this.fields = this.projectService.projectFields

  }

  projectId : string

  delete() {
    this.projectService.delete()
  }

  checkboxChange(i) {
    this.projectService.projectCheckboxChange(i)
  }
}
