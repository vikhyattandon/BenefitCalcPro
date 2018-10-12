import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home';
import { AboutComponent } from './about';
import { ProfileComponent } from './profile';
import { MaterialComponent } from './material';
import { EmployeeInfoComponent } from './employee-info';

import { AuthGuard } from './auth-guard';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about/:id', component: AboutComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'material', component: MaterialComponent },
  { path: 'employeeInfo/:id', component: EmployeeInfoComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class Ng2PlayRoutingModule { }
