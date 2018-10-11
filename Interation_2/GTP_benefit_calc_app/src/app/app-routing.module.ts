import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home';
//import { AboutComponent } from './about';
//import { ProfileComponent } from './profile';
//import { MaterialComponent } from './material';
import { EmployeeSearchComponent } from './employee-search';
import { EmployeeInfoComponent } from './employee-info';
import { EmployeeRegisterComponent } from './employee-register';
import { BenefitReportComponent } from './benefit-report';
import { BenefitDiffReportComponent } from './benefit-diff-report';

import { AuthGuard } from './auth-guard';

const routes: Routes = [
  { path: '', component: HomeComponent },
  //{ path: 'about/:id', component: AboutComponent },
  //{ path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  //{ path: 'material', component: MaterialComponent },
  { path: 'benefitDiffReport', component: BenefitDiffReportComponent },
  { path: 'benefitReport', component: BenefitReportComponent },
  { path: 'employeeRegister', component: EmployeeRegisterComponent },
  { path: 'employeeInfo/:id', component: EmployeeInfoComponent },
  { path: 'employeeSearch', component: EmployeeSearchComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class Ng2PlayRoutingModule { }
