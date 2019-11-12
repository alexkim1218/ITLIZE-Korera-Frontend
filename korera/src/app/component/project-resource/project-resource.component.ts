import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../service/project.service';
import { MatIconRegistry } from "@angular/material/icon";
import { DomSanitizer } from "@angular/platform-browser";
import { ResourceService } from 'src/app/service/resource.service';
import { Resource } from 'src/app/resource';
import { UserService } from 'src/app/service/user.service';
import { mergeMap } from 'rxjs/operators';
import { ProjectSelectorService } from 'src/app/service/project-selector.service';

@Component({
  selector: 'app-project-resource',
  templateUrl: './project-resource.component.html',
  styleUrls: ['./project-resource.component.css']
})

export class ProjectResourceComponent implements OnInit {

  resources
  fields: string[] = ["resourceId", "resourceName", "resourceCode"]

  constructor(
    private projectService : ProjectService, 
    private resourceService : ResourceService,
    private userService : UserService,
    private projectSelectorService : ProjectSelectorService,
    private matIconRegistry: MatIconRegistry, 
    private domSanitizer: DomSanitizer) {
    this.matIconRegistry.addSvgIcon(
      "import",
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/img/import_arrow.svg")
    );
    this.matIconRegistry.addSvgIcon(
      "list",
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/img/list.svg")
    );
    this.matIconRegistry.addSvgIcon(
      "check",
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/img/check.svg")
    );
    this.matIconRegistry.addSvgIcon(
      "uncheck",
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/img/uncheck.svg")
    );
  }

  ngOnInit() {
    this.resources = this.projectService.resourceResources
    this.resourceService.getAllResources().subscribe(
      resources => {
        console.log("all resources got")
        console.log(resources)
        this.projectService.resourceResources = resources
        this.resources = this.projectService.resourceResources
      })
  }

  checkboxChange(i) {
    this.projectService.resourceCheckboxChange(i)
  }

  import() {
    this.projectService.import()
  }

  selectAll() {
    this.projectService.selectAll()
  }

  clearAll() {
    this.projectService.clearAll()
  }
}
