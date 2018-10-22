import {Component, OnInit} from '@angular/core';
import {Observable}     from 'rxjs/Rx';
import {Router, NavigationEnd } from '@angular/router';
import {FormBuilder, FormGroup, FormControl, FormsModule } from '@angular/forms';
import {Validators} from '@angular/forms';
import {EmployeeSearchService } from './employee-search.service';
import {BaseComponent }  from '../shared/base.component';
import {Employee }  from '../shared/employee';
import {Dependent }  from '../shared/dependent';
import {EmployerContribution }  from '../shared/employer-contribution';
import {BenefitPlan }  from '../shared/benefit-plan';
declare var $:any;

@Component({
  selector: 'app-employee-search',
  viewProviders: [FormBuilder, FormsModule],
  templateUrl: './employee-search.component.html',
  providers: [EmployeeSearchService]
})

export class EmployeeSearchComponent extends BaseComponent implements OnInit {
  resultEmployees : Array<Employee>;
  currentEmployee: Employee;
  errorMessage: string;
  showError: boolean;  
  
  fb: FormBuilder;
  employeeSearchForm: FormGroup;
  firstName: FormControl;
  lastName: FormControl;
  
  constructor(fb: FormBuilder, private employeeSearchService: EmployeeSearchService, private router1: Router) {
    super(employeeSearchService, router1);  
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
    this.checkAllBenefitPlans();
  }

  private printData(testData):void {    
    this.resultEmployees = this.resultEmployees.concat(testData);
    
    this.showError = false;
    console.log('printData() called: ', this.resultEmployees);       
  } 

  onSubmit(): void {    
    console.log("onSubmit() called.");  
    this.resultEmployees = []; 
    this.employeeSearchService.findEmployeesByName(this.firstName.value, this.lastName.value).subscribe(
                                  testData => this.printData(testData), 
                                  error =>  this.printError(<any>error));         
  }  
}
