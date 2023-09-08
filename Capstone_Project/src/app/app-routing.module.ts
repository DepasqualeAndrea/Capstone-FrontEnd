import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { HomePagComponent } from './components/home-pag/home-pag.component';

const routes: Routes = [
  {
    path: '', redirectTo: 'login', pathMatch: 'full'
},
{
     path: 'login', component: LoginComponent
},
{
    path: 'home', component: HomePagComponent
    //canActivate: [GuardGuard]
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
