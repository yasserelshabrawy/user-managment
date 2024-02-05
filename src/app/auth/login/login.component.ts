import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Admin } from '../../models/admin';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  admin: Admin[] = [];
  result!: Admin;
  loginForm!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private snakBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.createForm();
    this.getAdmin();
  }
  createForm() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z 0-9])(?=.{8,})/),
        ],
      ],
    });
  }

  getAdmin() {
    this.authService.getAdmin().subscribe({
      next: (res: any) => {
        this.admin = res;
      },
    });
  }
  login() {
    let index = this.admin.findIndex(
      (item) =>
        item.email === this.loginForm.value.email &&
        item.password === this.loginForm.value.password
    );
    if (index === 0) {
      const model = {
        email: this.loginForm.value.email,
        password: this.loginForm.value.password,
        username: 'Admin',
      };
      this.authService.login(model).subscribe({
        next: (res: any) => {
          this.result = res;
          localStorage.setItem('token', this.result.username);
          this.router.navigate(['']);

          this.snakBar.open('logined successfully', 'success', {
            duration: 3000,
            horizontalPosition: 'end',
            verticalPosition: 'top',
          });
        },
      });
      return;
    }

    this.snakBar.open('Email or Password is incorrect', 'failed', {
      duration: 3000,
      horizontalPosition: 'end',
      verticalPosition: 'top',
    });
  }
}
