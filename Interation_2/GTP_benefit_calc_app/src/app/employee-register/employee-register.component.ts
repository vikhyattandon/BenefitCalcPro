import {Component, OnInit} from '@angular/core';
import {Observable}     from 'rxjs/Rx';
import {FormBuilder, FormGroup, FormControl } from '@angular/forms';
import {Router} from '@angular/router';
import {Validators} from '@angular/forms';
import {EmployeeRegisterService } from './employee-register.service';
import {BaseComponent }  from '../shared/base.component';
import {Employee }  from '../shared/employee';

@Component({
  selector: 'app-employee-register',
  viewProviders: [FormBuilder],
  templateUrl: './employee-register.component.html',
  providers: [EmployeeRegisterService]
})

export class EmployeeRegisterComponent extends BaseComponent implements OnInit {
  id: Number;
  employee: Employee;
  errorMessage: string;
  showError: boolean;  
  
  fb: FormBuilder;
  employeeForm: FormGroup;  // our model driven form
  submitted: Boolean;
  
  constructor(fb: FormBuilder, private employeeRegisterService: EmployeeRegisterService, private router1: Router) {
    super(employeeRegisterService, router1);
    this.id = 1;
    this.fb = fb;     
  }

  ngOnInit(): void {
    console.log('ngOnInit() called');        

    this.employeeForm = new FormGroup({
        firstName: new FormControl('', [<any>Validators.required, <any>Validators.minLength(2)]), 
        lastName: new FormControl('', [<any>Validators.required, <any>Validators.minLength(2)]),
        login: new FormControl('', [<any>Validators.required, <any>Validators.minLength(3)]),        
    });                                       
  }

  saveEmployee(employee: Employee, isValid: boolean) {
      this.submitted = true; // set form submit to true

      console.log(employee, isValid);
      employee.status = 'INACTIVE';
      this.employeeRegisterService.saveEmployee(employee);
      console.log("employee registered");  
      alert("Employee Registered Successfully!"); 
      //this.ngOnInit(); 
      window.location.href = 'http://localhost:4201/login';  
  }
/*
 private printError(error):void {
    this.errorMessage = error;
    this.showError = true;
    console.log(this.errorMessage);    
  } 

  public clearResult():void {
    this.errorMessage = null;        
  } */
}
