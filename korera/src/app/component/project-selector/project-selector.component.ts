import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProjectSelectorService } from 'src/app/service/project-selector.service';
import { UserService } from 'src/app/service/user.service';
import { Project } from '../../project';
import { flatMap } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-project-selector',
  templateUrl: './project-selector.component.html',
  styleUrls: ['./project-selector.component.css']
})
export class ProjectSelectorComponent implements OnInit {
  currentProject : Project = { projectId: 1, projectName: "Click Here", extraCols: "", extraColsType: "" }
  projects$ : Project[];
  private subscriptions: Subscription[] = [];

  constructor(private projectSelectorService: ProjectSelectorService, private userService: UserService, private modalService: NgbModal) {}

  ngOnInit() {
    // this.currentProject = this.projectSelectorService.currentProject
    this.subscriptions.push(
    this.userService.getUser()
      .pipe(flatMap(user => this.projectSelectorService.loadProjects(user.userId)))
      .subscribe(response => this.projects$ = response))
    this.subscriptions.push(
    this.projectSelectorService.getCurrentProjectObservable().subscribe(currentProject => this.currentProject = currentProject)
    )
  }

  changeCurrentProject(i: number) {
    this.projectSelectorService.changeCurrentProject(this.projects$[i])
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => {
      subscription.unsubscribe()
    })
  }
}
