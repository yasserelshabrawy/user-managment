import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../modules/shared/shared.module';
import { AppRoutingModule } from '../app-routing.module';

const routes: Routes = [
  {
    path: '',
    component:LoginComponent
  },

];

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    
  ]
})
export class AuthModule { }
