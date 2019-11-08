import { Component, OnInit, Input } from '@angular/core';
import { Project } from '../../project';
import { UserService } from 'src/app/service/user.service';
import { flatMap } from 'rxjs/operators';
import { ProjectSelectorService } from 'src/app/service/project-selector.service';

@Component({
  selector: 'app-project-selector',
  templateUrl: './project-selector.component.html',
  styleUrls: ['./project-selector.component.css']
})
export class ProjectSelectorComponent implements OnInit {

  currentProject : Project = {projectId: 1, projectName: "default value 1", extraCols: "123", extraColsType: "456"}
  projects$ : Project[] = [
    {projectId: 1, projectName: "default value 1", extraCols: "123", extraColsType: "456"},
    {projectId: 2, projectName: "default value 2", extraCols: "123", extraColsType: "456"}
  ]

  constructor(private projectSelectorService: ProjectSelectorService, private userService: UserService) { }

  ngOnInit() {
    this.userService.getUser()
      .pipe(flatMap(user => this.projectSelectorService.loadProjects(user.userId)))
      .subscribe(response => this.projects$ = response)
    this.projectSelectorService.currentProject$.subscribe(currentProject => this.currentProject = currentProject)
  }

  changeCurrentProject(i: number) {
    this.projectSelectorService.changeCurrentProject(this.projects$[i])
  }
}
