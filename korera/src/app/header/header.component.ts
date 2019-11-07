import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(public dialog: MatDialog) {}

  ngOnInit() {
  }

  openUserDialog(): void {
      const dialogRef = this.dialog.open(UserDialog, {
        panelClass: 'custom-dialog-container',
        position: {top: '85px', right: '8%'}
      });
  }

  openQuestionDialog(): void {
      const dialogRef = this.dialog.open(QuestionDialog, {
        panelClass: 'custom-dialog-container',
        position: {top: '85px', right: '2%'}
      });
  }
}

@Component({
  selector: 'user-dialog',
  templateUrl: './user-dialog/user-dialog.html',
  styleUrls: ['./user-dialog/user-dialog.css']
})
export class UserDialog {

  constructor(public dialogRef: MatDialogRef<UserDialog>) {}

  onNoClick(): void {
    this.dialogRef.close();
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
