import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainModule } from './components/main/main.module';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import(`./components/main/main.module`).then((m) => m.MainModule),
  },
  {
    path:'login',
    loadChildren: ()=>
    import(`./auth/auth.module`).then((m)=> m.AuthModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
