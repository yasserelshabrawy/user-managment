import { User } from './../../../models/user';
import { Component, OnInit } from '@angular/core';
import { AfterViewInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { UserService } from 'src/app/services/user.service';
import { UserDialogComponent } from './new-user/user-dialog/user-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit{
  user: User[] = [];
  selectedAll: User[] = [];
  selected: boolean = false;
  constructor(
    private userService: UserService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}
  displayedColumns: string[] = [
    'select',
    'name',
    'email',
    'role',
    'joined',
    'Edit',
  ];
  dataSource = new MatTableDataSource<User>(this.user);
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit() {
    this.getUser();
  }

  getUser() {
    this.userService.getUser().subscribe((res: any) => {
      this.user = res;
      this.dataSource = new MatTableDataSource<User>(this.user);
      this.dataSource.paginator = this.paginator;
    });
  }

  newUser(addUser: any) {
    if (addUser) {
      this.user.push(addUser);
      this.dataSource = new MatTableDataSource<User>(this.user);
      this.dataSource.paginator = this.paginator;
    }

  }

  searchByName(value: string) {
    this.dataSource.data = value
      ? this.user.filter((user) =>
          user.username.toLowerCase().includes(value.toLowerCase())
        )
      : (this.dataSource.data = this.user);
  }

  filterRole(role: string) {
    this.dataSource.data = role
      ? this.user.filter((user) => user.role === role)
      : (this.dataSource.data = this.user);
  }

  filterDate(date: string) {
    this.dataSource.data = date
      ? this.user.filter((user) => user.joined === date)
      : (this.dataSource.data = this.user);
  }
  selectDate(select: string) {
    this.dataSource.data =
      select === 'Anytime' ? (this.dataSource.data = this.user) : this.user;
  }

  delete(id: string) {
    this.userService.deleteUser(id).subscribe(() => {
      this.user = this.user.filter((user) => user.id !== id);
      this.dataSource = new MatTableDataSource<User>(this.user);
      this.dataSource.paginator = this.paginator;
      this.snackBar.open('user deleted successfully', 'Success', {
        horizontalPosition: 'right',
        verticalPosition: 'top',
        duration: 2000,
      });
    });
  }

  update(user: User) {
    const dialogRef = this.dialog.open(UserDialogComponent, {
      width: '650px',
      data: user,
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.getUser();
    });
  }

  selectedUsers() {
    if (this.selected) this.selectedAll = this.user;
    else this.selectedAll = [];
  }

  checkBox(ele: User) {
    let index = this.selectedAll.findIndex((user) => user.id == ele.id);
    if (index === -1) this.selectedAll.push(ele);
    else this.selectedAll.splice(index, 1);
  }

  deleteAll() {
    this.selectedAll.forEach((item: any) => {
      this.userService.deleteUser(item?.id).subscribe(() => {
        this.snackBar.open('user deleted successfully', 'Success', {
          horizontalPosition: 'right',
          verticalPosition: 'top',
          duration: 2000,
        });
        this.selected = false
        this.selectedAll = [];
        this.user = this.user.filter((user) => user.id !== item.id);
        this.dataSource = new MatTableDataSource<User>(this.user);
        this.dataSource.paginator = this.paginator;
      });
    });
  }
}
