import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../service/project.service';
import { MatIconRegistry } from "@angular/material/icon";
import { DomSanitizer } from "@angular/platform-browser";

@Component({
  selector: 'app-project-resource',
  templateUrl: './project-resource.component.html',
  styleUrls: ['./project-resource.component.css']
})

export class ProjectResourceComponent implements OnInit {

  resources
  fields
  selectAllbutton: boolean = false

  constructor(private projectService : ProjectService, private matIconRegistry: MatIconRegistry, private domSanitizer: DomSanitizer) {
    this.matIconRegistry.addSvgIcon(
      "import",
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/import_arrow.svg")
    );
    this.matIconRegistry.addSvgIcon(
      "list",
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/list.svg")
    );
  }

  ngOnInit() {
    this.projectService.getResourceFields()
    this.projectService.getResourceResources()
    this.resources = this.projectService.resourceResources
    this.fields = this.projectService.resourceFields
  }

  checkboxChange(i) {
    this.projectService.resourceCheckboxChange(i)
    this.resources = this.projectService.resourceResources
    this.fields = this.projectService.resourceFields
  }

  import() {
    this.projectService.import()
  }

  clickSelectAllButton() {
    this.selectAllbutton = !this.selectAllbutton
  }

  selectAll() {
    this.projectService.selectAll()
    this.resources = this.projectService.resourceResources
    this.fields = this.projectService.resourceFields
  }

  clearAll() {
    this.projectService.clearAll()
    this.resources = this.projectService.resourceResources
    this.fields = this.projectService.resourceFields
  }
}