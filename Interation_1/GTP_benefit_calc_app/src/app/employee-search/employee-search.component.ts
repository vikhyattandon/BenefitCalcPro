import {Component, OnInit} from '@angular/core';
import {Observable}     from 'rxjs/Rx';
import {FormBuilder, FormGroup, FormControl, FormsModule } from '@angular/forms';
import {Validators} from '@angular/forms';
import {EmployeeSearchService } from './employee-search.service';
import {Employee }  from '../shared/employee';
import {Dependent }  from '../shared/dependent';
import {EmployerContribution }  from '../shared/employer-contribution';
import {BenefitPlan }  from '../shared/benefit-plan';
import {MdCheckboxChange } from '@angular/material';

@Component({
  selector: 'app-employee-search',
  viewProviders: [FormBuilder, FormsModule],
  templateUrl: './employee-search.component.html',
  providers: [EmployeeSearchService]
})

export class EmployeeSearchComponent implements OnInit {
  allBenefitPlans: Array<BenefitPlan>;
  allEmployerContributions: Array<EmployerContribution>;

  resultEmployees : Array<Employee>;
  currentEmployee: Employee;
  errorMessage: string;
  showError: boolean;  
  
  fb: FormBuilder;
  employeeSearchForm: FormGroup;
  firstName: FormControl;
  lastName: FormControl;
  
  constructor(fb: FormBuilder, private employeeSearchService: EmployeeSearchService) {
    this.fb = fb;
    this.resultEmployees = [];
    this.firstName = new FormControl('', Validators.required);
    this.lastName = new FormControl('', Validators.required);
    this.employeeSearchForm = this.fb.group({
      'firstName': this.firstName,
      'lastName': this.lastName
    });
  }

  public setCurrentEmployee(employee: Employee) {  
    this.currentEmployee = employee;

    let redirectPath = '/employeeInfo/' + employee.id;
    console.log(redirectPath); 
    window.location.href = redirectPath;  
  }

  ngOnInit(): void {
    console.log('ngOnInit() called');   
    this.allBenefitPlans = JSON.parse(localStorage.getItem('allBenefitPlans'));
    this.allEmployerContributions = JSON.parse(localStorage.getItem('allEmployerContributions'));
    
    if (typeof this.allBenefitPlans !== 'undefined' &&
        this.allBenefitPlans != null && this.allBenefitPlans.length > 0) {
      console.log('allBenefitPlans have been loaded before...');
    }
    else {
      this.employeeSearchService.getAllBenefitPlanList()
                                .subscribe(testData => this.printBenefitPlanData(testData), 
                                           error => this.printError(<any>error)); 
    }
    
    if (typeof this.allBenefitPlans !== 'undefined' && 
        this.allBenefitPlans != null && this.allBenefitPlans.length > 0) {
      console.log('allEmployerContributions have been loaded before...');
    }
    else {
      this.employeeSearchService.getAllEmployerContributions()
                                .subscribe(testData => this.printEmployerContributionData(testData), 
                                           error => this.printError(<any>error)); 
    }  
  }

  private printBenefitPlanData(testData):void { 
    console.log("printBenefitPlanData() called...");
    this.allBenefitPlans = [];
    this.allBenefitPlans = this.allBenefitPlans.concat(testData);
    console.log(this.allBenefitPlans); 
    localStorage.setItem('allBenefitPlans', JSON.stringify(this.allBenefitPlans));
  }

  private printEmployerContributionData(testData):void { 
    console.log("printEmployerContributionData() called...");
    this.allEmployerContributions = [];
    this.allEmployerContributions = this.allEmployerContributions.concat(testData);
    console.log(this.allEmployerContributions); 
    localStorage.setItem('allEmployerContributions', JSON.stringify(this.allEmployerContributions));
  }

  private printData(testData):void {    
    this.resultEmployees = this.resultEmployees.concat(testData);
    
    this.showError = false;
    console.log('printData() called: ', this.resultEmployees);       
  } 

  private printError(error):void {
    this.errorMessage = error;
    this.showError = true;
    console.log(this.errorMessage);    
  } 

  onSubmit(): void {    
    console.log("onSubmit() called.");  
    this.resultEmployees = []; 
    this.employeeSearchService.findEmployeesByName(this.firstName.value, this.lastName.value).subscribe(
                                  testData => this.printData(testData), 
                                  error =>  this.printError(<any>error));         
  }  

  public clearResult():void {
    console.log("clearResult() called.");  
    this.errorMessage = null;        
  } 
}
