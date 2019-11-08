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

  }



}
