import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserDialogComponent } from './user-dialog/user-dialog.component';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.scss'],
})
export class NewUserComponent implements OnInit {
  constructor(public dialog: MatDialog) {}
  @Output('newUser') newEvent = new EventEmitter<string>();

  addUser(user: any) {
    this.newEvent.emit(user);
  }
  ngOnInit(): void {}
  openDialog(): void {
    const dialogRef = this.dialog.open(UserDialogComponent, {
      width: '650px',
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      this.addUser(result);
    });
  }
}
