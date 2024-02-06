import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { DatePipe } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-dialog',
  templateUrl: './user-dialog.component.html',
  styleUrls: ['./user-dialog.component.scss'],
  providers: [DatePipe],
})
export class UserDialogComponent implements OnInit {
  roles: any;
  user: User[] = [];
  userForm!: FormGroup;
  constructor(
    private userService: UserService,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<User>,
    private datePipe: DatePipe,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: User
  ) {}

  ngOnInit(): void {
    this.getRoles();
    this.createForm();
  }

  getRoles() {
    this.userService.getRoles().subscribe((res) => {
      this.roles = res;
    });
  }

  createForm() {
    this.userForm = this.fb.group({
      username: [this.data?.username || '', [Validators.required]],
      email: [this.data?.email || '', [Validators.required]],
      joined: [
        this.data && this.data.joined
          ? new Date(this.data.joined).toISOString()
          : '',
        [Validators.required],
      ],
      role: [this.data?.role || '', [Validators.required]],
    });
  }

  close(res: any) {
    this.dialogRef.close(res);
  }
  closeD(){
    this.dialogRef.close();
  }

  addUser() {
    const formattedDate = this.datePipe.transform(
      this.userForm.value.joined,
      'MM/dd/yyyy'
    );

    this.userForm.patchValue({ joined: formattedDate });
    this.userService.addUser(this.userForm.value).subscribe((res: any) => {
      this.user = res;
      this.snackBar.open('Added User Successfully', 'Success', {
        duration: 2000,
        verticalPosition: 'top',
        horizontalPosition: 'end',
      });
      this.close(this.user);
    });
  }

  update() {
    const formattedDate = this.datePipe.transform(
      this.userForm.value.joined,
      'MM/dd/yyyy'
    );

    this.userForm.patchValue({ joined: formattedDate });
    this.userService
      .updateUser(this.userForm.value, this.data?.id)
      .subscribe((res: any) => {
        this.user = res;
        this.close(this.user);
        this.snackBar.open('Updated User Successfully', 'Success', {
          duration: 2000,
          verticalPosition: 'top',
          horizontalPosition: 'end',
        });
      });
  }
}
