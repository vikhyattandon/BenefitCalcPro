import {Component, OnInit} from '@angular/core';
import {Observable}     from 'rxjs/Rx';
import {FormBuilder, FormGroup, FormControl } from '@angular/forms';
import {Router, ActivatedRoute} from '@angular/router';
import {Validators} from '@angular/forms';
import {EmployeeInfoService } from './employee-info.service';
//import {CacheDataService } from '../shared/cached-data-service';
import {Employee }  from '../shared/employee';
import {Dependent }  from '../shared/dependent';
import {EmployerContribution }  from '../shared/employer-contribution';
import {BenefitPlan }  from '../shared/benefit-plan';
import {MdCheckboxChange } from '@angular/material'; 

@Component({
  selector: 'app-employee-info',
  viewProviders: [FormBuilder],
  templateUrl: './employee-info.component.html',
  providers: [EmployeeInfoService]
})

export class EmployeeInfoComponent implements OnInit {
  allBenefitPlans: Array<BenefitPlan>;
  allEmployerContributions: Array<EmployerContribution>;

  testStr: string;
  medicalPlan: BenefitPlan;

  id: number;
  currentEmployee: Employee;
  dependents: Array<Dependent>;
  currentDependent: Dependent;
  dependentTypes: Array<String>;
  errorMessage: string;
  showError: boolean;  
  
  fb: FormBuilder;
  employeeForm: FormGroup;  // our model driven form
  dependentForm: FormGroup;
  public submitted: boolean; // keep track on whether form is submitted
  public events: any[] = []; // use later to display form changes
  
  constructor(fb: FormBuilder, private employeeInfoService: EmployeeInfoService, private route: ActivatedRoute) {
                               
    this.fb = fb;     
  }

  public backToSearch() {  
    let redirectPath = '/';
    console.log(redirectPath); 
    window.location.href = redirectPath;  
  }

  ngOnInit(): void {
    console.log('ngOnInit() called'); 

    this.dependentTypes =
    [
      "Spouse", "Child"
    ] 
    
    this.allBenefitPlans = JSON.parse(localStorage.getItem('allBenefitPlans'));
    this.allEmployerContributions = JSON.parse(localStorage.getItem('allEmployerContributions'));
                                        
    this.id = this.route.snapshot.params['id'];
    this.route.params
      .map(params => params['id'])
      .subscribe(id => {
        this.id = id;
      });   

    this.getEmployeeInfo(); 
  }                                   

  private getEmployeeInfo() {
    this.employeeInfoService.getEmployee(this.id)
                            .subscribe(testData => this.printData(testData), 
                                       error => this.printError(<any>error)); 

    this.employeeForm = new FormGroup({
        id: new FormControl(0, [<any>Validators.required, <any>Validators.minLength(0)]),
        firstName: new FormControl('', [<any>Validators.required, <any>Validators.minLength(2)]), 
        lastName: new FormControl('', [<any>Validators.required, <any>Validators.minLength(2)]),
        status: new FormControl('', [<any>Validators.required, <any>Validators.minLength(0)]),
        login: new FormControl('', [<any>Validators.required, <any>Validators.minLength(3)]),
        email: new FormControl('', [<any>Validators.required, <any>Validators.minLength(3)]),
        birthday: new FormControl('', [<any>Validators.required, <any>Validators.minLength(8)]), 
        startDate: new FormControl('', [<any>Validators.required, <any>Validators.minLength(8)]), 
        medicalPlan: new FormControl('', [<any>Validators.required, <any>Validators.minLength(1)]), 
        dentalPlan: new FormControl('', [<any>Validators.required, <any>Validators.minLength(1)]), 
        visionPlan: new FormControl('', [<any>Validators.required, <any>Validators.minLength(1)]), 
        medicalContribution: new FormControl('', [<any>Validators.required, <any>Validators.minLength(1)]), 
        dentalContribution: new FormControl('', [<any>Validators.required, <any>Validators.minLength(1)]), 
        visionContribution: new FormControl('', [<any>Validators.required, <any>Validators.minLength(1)]),       
        allBenefitPlans: new FormControl('', [<any>Validators.required, <any>Validators.minLength(1)])
    });
    
    console.log("dependents - " + this.dependents);                                        
  }

  public setCurrentDependent(dependent: Dependent) {  
    this.currentDependent = dependent;  
    console.log(this.currentDependent);

    this.dependentForm = new FormGroup({
        id: new FormControl(this.currentDependent.id),
        firstName: new FormControl(this.currentDependent.firstName, [<any>Validators.required, <any>Validators.minLength(2)]), 
        lastName: new FormControl(this.currentDependent.lastName, [<any>Validators.required, <any>Validators.minLength(2)]),
        birthday: new FormControl(this.currentDependent.birthday),
        type: new FormControl(this.currentDependent.type),
        employeeId: new FormControl(this.currentDependent.employeeId),
        medicalPlanFlag: new FormControl(this.currentDependent.medicalPlanFlag), 
        dentalPlanFlag: new FormControl(this.currentDependent.dentalPlanFlag),
        visionPlanFlag: new FormControl(this.currentDependent.visionPlanFlag)     
    }); 
  }

  public setNewDependent() {  
    console.log('setNewDependent() called.');
    this.currentDependent = {
        id:null, 
        firstName:null, 
        lastName:null,
        birthday:null,
        type:null,
        employeeId:this.id,
        medicalPlanFlag:false,
        dentalPlanFlag:false,
        visionPlanFlag:false,
        createTs:null,
        createTsStr:null      
    }; 

    this.dependentForm = new FormGroup({
        id: new FormControl(this.currentDependent.id),
        firstName: new FormControl(this.currentDependent.firstName, [<any>Validators.required, <any>Validators.minLength(2)]), 
        lastName: new FormControl(this.currentDependent.lastName, [<any>Validators.required, <any>Validators.minLength(2)]),
        birthday: new FormControl(this.currentDependent.birthday),
        type: new FormControl(this.currentDependent.type),
        employeeId: new FormControl(this.currentDependent.employeeId),
        medicalPlanFlag: new FormControl(this.currentDependent.medicalPlanFlag), 
        dentalPlanFlag: new FormControl(this.currentDependent.dentalPlanFlag),
        visionPlanFlag: new FormControl(this.currentDependent.visionPlanFlag)     
    }); 
  }

  saveEmployee(model: Employee, isValid: boolean) {
      this.submitted = true; // set form submit to true

      console.log(model, isValid);
      this.employeeInfoService.saveEmployee(model);
      console.log("employee updated");
      alert("Employee Updated Successfully!");
  }

  saveDependent(dependent: Dependent, isValid: boolean) {
      this.submitted = true; // set form submit to true

      console.log(dependent, isValid);
      this.employeeInfoService.saveDependent(dependent).subscribe(
                                  testData => this.afterAddOrDeleteAction(testData),
                                  error =>  this.printError(<any>error));
      //alert("Dependent Add or Updated Successfully!");
  }

  deleteDependent(dependent: Dependent) {
      console.log('deleteDependent() called: ' + dependent);
      this.employeeInfoService.deleteDependent(dependent).subscribe(
                                  testData => this.afterAddOrDeleteAction(testData),
                                  error =>  this.processDeleteDependentError(<any>error));
      //alert("Dependent Deleted Successfully!");
  }

  private afterAddOrDeleteAction(testData):void {
    console.log("afterAddOrDeleteAction() called: " + testData);
    this.currentEmployee = null;
    alert("Action Finished Successfully!");
    this.getEmployeeInfo();
  }

  private processDeleteDependentError(error):void {
    this.errorMessage = error;
    this.showError = false;
    console.log(this.errorMessage); 

    this.getEmployeeInfo();   
  } 

  private printData(testData):void { 
    this.currentEmployee = testData;
    this.showError = false;
    console.log('printData() called: ' + JSON.stringify(this.currentEmployee));   
    this.dependents =  this.currentEmployee.dependents; 

    this.employeeForm = new FormGroup({
        id: new FormControl(this.currentEmployee.id, [<any>Validators.required, <any>Validators.minLength(0)]),
        firstName: new FormControl(this.currentEmployee.firstName, [<any>Validators.required, <any>Validators.minLength(2)]), 
        lastName: new FormControl(this.currentEmployee.lastName, [<any>Validators.required, <any>Validators.minLength(2)]),
        status: new FormControl(this.currentEmployee.status, [<any>Validators.required, <any>Validators.minLength(0)]),
        login: new FormControl(this.currentEmployee.login, [<any>Validators.required, <any>Validators.minLength(3)]),
        email: new FormControl(this.currentEmployee.email, [<any>Validators.required, <any>Validators.minLength(3)]),
        birthday: new FormControl(this.currentEmployee.birthday, [<any>Validators.required, <any>Validators.minLength(8)]),  
        startDate: new FormControl(this.currentEmployee.startDate, [<any>Validators.required, <any>Validators.minLength(8)]), 
        medicalPlan: new FormControl(this.currentEmployee.medicalPlan, [<any>Validators.required, <any>Validators.minLength(1)]), 
        dentalPlan: new FormControl(this.currentEmployee.dentalPlan, [<any>Validators.required, <any>Validators.minLength(1)]), 
        visionPlan: new FormControl(this.currentEmployee.visionPlan, [<any>Validators.required, <any>Validators.minLength(1)]), 
        medicalContribution: new FormControl(this.currentEmployee.medicalContribution, [<any>Validators.required, <any>Validators.minLength(1)]), 
        dentalContribution: new FormControl(this.currentEmployee.dentalContribution), 
        visionContribution: new FormControl(this.currentEmployee.visionContribution),   
        dependents: new FormControl(this.currentEmployee.dependents)      
    });   
  } 

  private printError(error):void {
    this.errorMessage = error;
    this.showError = true;
    console.log(this.errorMessage);    
  } 

  onSubmit(): void {    
    console.log("onSubmit() is called"); 
  }  

  public clearResult():void {    
    this.errorMessage = null;        
  } 
}
