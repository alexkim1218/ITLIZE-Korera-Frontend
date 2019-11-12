import { Component, OnInit, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProjectSelectorService } from 'src/app/service/project-selector.service';
import { UserService } from 'src/app/service/user.service';
import { Project } from '../../project';
import { flatMap } from 'rxjs/operators';

@Component({
  selector: 'app-project-selector',
  templateUrl: './project-selector.component.html',
  styleUrls: ['./project-selector.component.css']
})
export class ProjectSelectorComponent implements OnInit {
  currentProject : Project = { projectId: 1, projectName: "Project1", extraCols: "123", extraColsType: "456" }
  projects$ : Project[] = [{ projectId: 2, projectName: "Project2", extraCols: "123", extraColsType: "456" }]


  constructor(private projectSelectorService: ProjectSelectorService, private userService: UserService, private modalService: NgbModal) {}


  ngOnInit() {
    this.currentProject = this.projectSelectorService.currentProject
    this.userService.getUser()
      .pipe(flatMap(user => this.projectSelectorService.loadProjects(user.userId)))
      .subscribe(response => {
        console.log(response)
        this.projects$ = response
      })
    // this.projectSelectorService.currentProject$.subscribe(currentProject => this.currentProject = currentProject)
  }

  changeCurrentProject(i: number) {
    this.projectSelectorService.changeCurrentProject(this.projects$[i])
  }
}
