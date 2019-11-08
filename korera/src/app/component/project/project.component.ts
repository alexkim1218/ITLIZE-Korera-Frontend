import { Project } from '../../project';
import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../service/project.service';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {

  projects: Project[];
  currentProject: Project;

  constructor(private projectService: ProjectService, private matIconRegistry: MatIconRegistry, private domSanitizer: DomSanitizer) {
    this.matIconRegistry.addSvgIcon(
      "tick",
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/img/tick.svg")
    );
  }

  ngOnInit() {

  }



}
