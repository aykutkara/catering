import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./components/login/login.component";
import {RegisterComponent} from "./components/register/register.component";
import {HomeComponent} from "./components/home/home.component";
import {AllCateringComponent} from "./components/all-catering/all-catering.component";
import {AuthGuard} from "./guards/auth.guard";
import {PastVotesComponent} from "./components/past-votes/past-votes.component";
import {ActiveVotingComponent} from "./components/active-voting/active-voting.component";
import {ProfileComponent} from "./components/profile/profile.component";

const routes: Routes = [
  {path:'login', component: LoginComponent},
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'register', component: RegisterComponent},
  {path:'home',canActivate: [AuthGuard], component: HomeComponent},
  {path:'all-catering', canActivate: [AuthGuard], component: AllCateringComponent},
  {path:'past-votes', canActivate: [AuthGuard], component: PastVotesComponent},
  {path:'active-voting', canActivate: [AuthGuard], component: ActiveVotingComponent},
  {path:'profile', canActivate: [AuthGuard], component: ProfileComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
