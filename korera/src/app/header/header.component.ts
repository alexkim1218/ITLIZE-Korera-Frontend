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

  openDialog(): void {
      const dialogRef = this.dialog.open(UserDialog, {
        width: '350px'
      });
    }
}

@Component({
  selector: 'user-dialog',
  templateUrl: './user-dialog.html',
  styleUrls: ['./user-dialog.css']
})
export class UserDialog {

  constructor(public dialogRef: MatDialogRef<UserDialog>) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
