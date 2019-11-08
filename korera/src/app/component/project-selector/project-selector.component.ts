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

  currentProject : Project
  projects$ : Project[]

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
