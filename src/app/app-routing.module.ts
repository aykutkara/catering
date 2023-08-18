import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./components/login/login.component";
import {RegisterComponent} from "./components/register/register.component";
import {HomeComponent} from "./components/home/home.component";
import {AllCateringComponent} from "./components/all-catering/all-catering.component";
import {AuthGuard} from "./guards/auth.guard";

const routes: Routes = [
  {path:'login', component: LoginComponent},
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'register', component: RegisterComponent},
  {path:'home',canActivate: [AuthGuard], component: HomeComponent},
  { path: 'all-catering', canActivate: [AuthGuard], component: AllCateringComponent}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
