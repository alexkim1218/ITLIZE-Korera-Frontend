import { Project } from './project';
import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../service/project.service';


@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {

  projects : Project[]
  currentProject : Project

  constructor(private projectService : ProjectService) { }

  ngOnInit() {
    this.loadProjects();
  }

  loadProjects() {
    this.projects[0] = new Project('123', 'abc');
    this.projects[1] = new Project('456', 'def');
    this.currentProject = this.projects[0];
  }

  loadResources() {
    
  }


}
