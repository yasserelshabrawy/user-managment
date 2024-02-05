import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from './table/table.component';
import { SearchComponent } from './table/search/search.component';
import { FilterComponent } from './table/filter/filter.component';
import { NewUserComponent } from './table/new-user/new-user.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { LayoutComponent } from './layout/layout.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { UserDialogComponent } from './table/new-user/user-dialog/user-dialog.component';
import { MaterialModule } from 'src/app/modules/material/material.module';

const routes: Routes = [
  {
    path: '',
    component:LayoutComponent ,
    children:[
      {path:'' , component:TableComponent}
    ]
  }
];

@NgModule({
  declarations: [
    TableComponent,
    SearchComponent,
    FilterComponent,
    NewUserComponent,
    NavbarComponent,
    LayoutComponent,
    UserDialogComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule,
    RouterModule.forChild(routes),
  ]
})
export class MainModule { }
