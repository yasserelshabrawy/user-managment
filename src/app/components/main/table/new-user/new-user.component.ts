import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserDialogComponent } from './user-dialog/user-dialog.component';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.scss'],
})
export class NewUserComponent implements OnInit {
  constructor(public dialog: MatDialog) {}
  @Output('newUser') newEvent = new EventEmitter<string>();

  ngOnInit(): void {}
  openDialog(): void {
    const dialogRef = this.dialog.open(UserDialogComponent, {
      width: '650px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.newEvent.emit(result)
    });
  }
}

