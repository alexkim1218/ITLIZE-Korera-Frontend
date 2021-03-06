import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ProjectSelectorService } from '../../service/project-selector.service';
import { UserService } from '../../service/user.service';
import { Project } from '../../project';
import { User } from '../../user';
import { Subscription } from 'rxjs';
import { flatMap } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  public currProjObs: Subscription
  public currUserObs: Subscription
  public currListObs: Subscription
  project: Project
  user: User

  constructor(public dialog: MatDialog,
    private projectSelectorService: ProjectSelectorService,
    private userService: UserService) {}

  ngOnInit() {
    this.projectSelectorService.currentProjectObs();
    this.currUserObs = this.userService.getUser().subscribe(
      res_user => {
        this.user = res_user;
        console.log(this.user);

        this.currListObs = this.projectSelectorService.loadProjects(this.user.userId).subscribe(
          res_project => {
            console.log(res_project);
            this.projectSelectorService.changeCurrentProject(res_project[0]);
          }
        );
      }
    )

    this.currProjObs = this.projectSelectorService.currentProjectSubject.subscribe(
      res_project => {
        console.log(res_project);
        this.project = res_project;
        // console.log(this.project);
      }
    );
    // this.projectSelectorService.updateCurrentProject();
  }

 ngOnDestroy() {
   this.currProjObs.unsubscribe();
   this.currUserObs.unsubscribe();
   this.currListObs.unsubscribe();
 }

  openUserDialog(): void {
      const dialogRef = this.dialog.open(UserDialog, {
        panelClass: 'custom-dialog-container',
        position: {top: '85px', right: '8%'}
      }
    );
  }

  openQuestionDialog(): void {
      const dialogRef = this.dialog.open(QuestionDialog, {
        panelClass: 'custom-dialog-container',
        position: {top: '85px', right: '2%'}
      }
    );
  }
}

@Component({
  selector: 'user-dialog',
  templateUrl: './user-dialog/user-dialog.html',
  styleUrls: ['./user-dialog/user-dialog.css']
})
export class UserDialog implements OnInit {
  user: User

  constructor(public dialogRef: MatDialogRef<UserDialog>,
    private userService: UserService,
    private router: Router) {}

  ngOnInit() {
    this.userService.getUser().subscribe(
      res_user => {
        this.user = res_user;
      }
    )
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  signOut() {
    localStorage.removeItem('token');
    this.dialogRef.close();
    this.router.navigateByUrl('/login');
    window.setInterval('window.location.reload()', 30);
  }
}

@Component({
  selector: 'question-dialog',
  templateUrl: './question-dialog/question-dialog.html',
  styleUrls: ['./question-dialog/question-dialog.css']
})
export class QuestionDialog {

  constructor(public dialogRef: MatDialogRef<QuestionDialog>) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
