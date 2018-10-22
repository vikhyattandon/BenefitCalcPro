import {Component, OnInit} from '@angular/core';
import {Observable}     from 'rxjs/Rx';
import { Router } from '@angular/router';
import {FormBuilder, FormGroup, FormControl, FormsModule } from '@angular/forms';
import {Validators} from '@angular/forms';
import {BaseService } from './base.service';
import {Employee }  from '../shared/employee';
import {Dependent }  from '../shared/dependent';
import {EmployerContribution }  from '../shared/employer-contribution';
import {BenefitPlan }  from '../shared/benefit-plan';
import {PlanCost }  from './plan-cost';

export class BaseComponent {
  allBenefitPlans: Array<BenefitPlan>;
  allMedicalPlans: Array<BenefitPlan>;
  allDentalPlans: Array<BenefitPlan>;
  allVisionPlans: Array<BenefitPlan>;
  maxReportNumber: number;

  allPlanCosts: Array<PlanCost>;
  allEmployerContributions: Array<EmployerContribution>;

  errorMessage: string;
  showError: boolean;  

  constructor(private baseService: BaseService, private router: Router) {    
  } 

  redirect(pagename: string) {
    this.router.navigate(['/'+pagename]);
  }
  
  saveLogin(login: string): void {
    localStorage.setItem('login', login);
  }

  isManager(): boolean {
    let managerLogin = 'willy.x.wang@gmail.com';
    let currentLogin = localStorage.getItem('login');
    if (currentLogin == managerLogin) {
      return true;
    }
    else {
      return false
    }
  }

  checkAllBenefitPlans(): void {
    console.log('checkAllBenefitPlans() called');   
    this.allBenefitPlans = JSON.parse(localStorage.getItem('allBenefitPlans'));
    
    if (typeof this.allBenefitPlans !== 'undefined' &&
        this.allBenefitPlans != null && this.allBenefitPlans.length > 0) {
      console.log('allBenefitPlans have been loaded before...' + JSON.stringify(this.allBenefitPlans));
    }
    else {
      this.baseService.getAllBenefitPlanList()
                                .subscribe(testData => this.printBenefitPlansData(testData), 
                                           error => this.printError(<any>error)); 
    }
  }

  checkAllPlanCosts(): void {
    console.log('checkAllPlanCosts() called');   
    this.allPlanCosts = JSON.parse(localStorage.getItem('allPlanCosts'));
    
    if (typeof this.allPlanCosts !== 'undefined' &&
        this.allPlanCosts != null && this.allPlanCosts.length > 0) {
      console.log('allPlanCosts have been loaded before...' + JSON.stringify(this.allPlanCosts));
    }
    else {
      this.baseService.getAllPlanCostList()
                      .subscribe(testData => this.printPlanCostsData(testData), 
                                           error => this.printError(<any>error)); 
    }
  }

  checkAllEmployerContributions(): void {
    console.log('checkAllEmployerContributions() called');   
    this.allEmployerContributions = JSON.parse(localStorage.getItem('allEmployerContributions'));
    
    if (typeof this.allEmployerContributions !== 'undefined' && 
        this.allEmployerContributions != null && this.allEmployerContributions.length > 0) {
      console.log('allEmployerContributions have been loaded before...' + JSON.stringify(this.allEmployerContributions));
    }
    else {
      this.baseService.getAllEmployerContributions()
                                .subscribe(testData => this.printEmployerContributionsData(testData), 
                                           error => this.printError(<any>error)); 
    }  
  }

   getMaxReportNumber(): void {
     console.log('getMaxReportNumber() called');
     this.baseService.getMaxReportNumber()
                                .subscribe(testData => this.printMaxReportNumberData(testData), 
                                           error => this.printError(<any>error)); 
   }

   private printMaxReportNumberData(testData):void { 
    this.maxReportNumber = testData;
    console.log('maxReportNumber: ' + this.maxReportNumber);     
  } 

  private printBenefitPlansData(testData):void { 
    console.log("printBenefitPlanData() called...");
    this.allBenefitPlans = [];
    this.allMedicalPlans = [];
    this.allDentalPlans = [];
    this.allVisionPlans = [];

    this.allBenefitPlans = this.allBenefitPlans.concat(testData);
    
    this.allMedicalPlans = this.allBenefitPlans.filter(b => b.type == 'M');
    this.allDentalPlans = this.allBenefitPlans.filter(b => b.type == 'D');
    this.allVisionPlans = this.allBenefitPlans.filter(b => b.type == 'V');

    localStorage.setItem('allBenefitPlans', JSON.stringify(this.allBenefitPlans));
    localStorage.setItem('allMedicalPlans', JSON.stringify(this.allMedicalPlans));
    localStorage.setItem('allDentalPlans', JSON.stringify(this.allDentalPlans));
    localStorage.setItem('allVisionPlans', JSON.stringify(this.allVisionPlans));

    console.log(this.allBenefitPlans); 
    console.log(this.allMedicalPlans); 
    console.log(this.allDentalPlans); 
    console.log(this.allVisionPlans); 
  }

  private printEmployerContributionsData(testData):void { 
    console.log("printEmployerContributionData() called...");
    this.allEmployerContributions = [];
    this.allEmployerContributions = this.allEmployerContributions.concat(testData);
    console.log('allEmployerContributions' + this.allEmployerContributions); 
    localStorage.setItem('allEmployerContributions', JSON.stringify(this.allEmployerContributions));
  } 

  private printPlanCostsData(testData):void { 
    console.log("printPlanCostsData() called...");
    this.allPlanCosts = [];
    this.allPlanCosts = this.allPlanCosts.concat(testData);
    console.log('allPlanCosts: ' + this.allPlanCosts); 
    localStorage.setItem('allPlanCosts', JSON.stringify(this.allPlanCosts));
  } 

  printError(error):void {
    this.errorMessage = error;
    this.showError = true;
    console.log(this.errorMessage);    
  } 

  clearResult():void {
    console.log("clearResult() called.");  
    this.errorMessage = null;        
  } 
}
