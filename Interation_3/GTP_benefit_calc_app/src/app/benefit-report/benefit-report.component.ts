import {Component, OnInit} from '@angular/core';
import {Observable}     from 'rxjs/Rx';
import {Router } from '@angular/router';
import {FormBuilder, FormGroup, FormControl, FormsModule } from '@angular/forms';
import {Validators} from '@angular/forms';
import {BenefitReportService } from './benefit-report.service';
import {BaseComponent }  from '../shared/base.component';
import {Employee }  from '../shared/employee';
import {BenefitReport }  from '../shared/benefit-report';
import {Dependent }  from '../shared/dependent';

@Component({
  selector: 'app-benefit-report',
  viewProviders: [FormBuilder, FormsModule],
  templateUrl: './benefit-report.component.html',
  providers: [BenefitReportService]
})

export class BenefitReportComponent extends BaseComponent implements OnInit {
  resultEmployees : Array<Employee>;
  benefitReports: Array<BenefitReport>;
  benefitReportItem: BenefitReport;
  
  errorMessage: string;
  showError: boolean;  
  
  constructor(private benefitReportService: BenefitReportService, private router1: Router) {
    super(benefitReportService, router1);    
  }

  ngOnInit(): void {
    console.log('ngOnInit() called');   
    this.checkAllBenefitPlans();
    this.checkAllEmployerContributions();
    this.checkAllPlanCosts();
    this.getMaxReportNumber();

    console.log('AllPlanCosts: ' + this.allPlanCosts);

    this.resultEmployees = []; 
    this.benefitReportService.findActiveEmployees().subscribe(
                                  testData => this.printData(testData), 
                                  error =>  this.printError(<any>error));  
  }

  private printData(testData):void {    
    this.resultEmployees = this.resultEmployees.concat(testData);
    this.benefitReports = [];

    this.resultEmployees.forEach(employee => {
      console.log(employee);
      var today = new Date();
      let yearMonth = today.toISOString().substr(0, 7);

      // For each employee, calculate the employee and their depend benefit cost.
      let benefitCost = this.getBenefitCostPerEmployee(employee);      

      // For each employee, calculate the employer contribution based on service year and benefit type.
      let employerContribution = this.getEmployerContribution(employee);

      // Calculate the final benefit cost.
      let finalCost = benefitCost - employerContribution;
      let reportNumber = 1001
      if (this.maxReportNumber != null) {
        reportNumber = this.maxReportNumber + 1;
      }
      
      let costDiff = 0;
      let createTs = 0;
      let createTsStr = '';

      this.benefitReportItem = {employee, yearMonth, benefitCost, employerContribution, 
                                finalCost, reportNumber, createTs, createTsStr};

      this.benefitReports.push(this.benefitReportItem);
    });

    this.benefitReports.forEach(br => {
      this.benefitReportService.saveBenefitReport(br);
    })

    this.showError = false;
    console.log('printData() called: ', this.resultEmployees);       
  } 

  private getBenefitCostPerEmployee(employee: Employee): number {
    let employeeBenefitCost = this.getBenefitCostForEmployee(employee);

    let dependentBenefitCost = this.getBenefitCostForDependents(employee);

    let totalCost = employeeBenefitCost + dependentBenefitCost;
    console.log('benefit cost(all): ' + totalCost + ' - ' + employee.firstName);
    return totalCost;
  }

  private getBenefitCostForEmployee(employee: Employee): number {
    console.log('getBenefitCostForEmployee() called');
    let totalCost = 0;
    console.log('employee: ' + JSON.stringify(employee));

    if (typeof employee.birthday !== 'undefined' && employee.birthday != null ) {
      let age = this.getAge(employee.birthday.toString());
      if (typeof employee.medicalPlan !== 'undefined' && employee.medicalPlan != null && employee.medicalPlan.id > 0) {
        let medicalCost = this.getUnitBenefitCostForMedical(employee.medicalPlan.id, age);
        totalCost = totalCost + medicalCost;
      }
      if (typeof employee.dentalPlan !== 'undefined' && employee.dentalPlan != null && employee.dentalPlan.id > 0) {
        let dentalCost = this.getUnitBenefitCostForDentalOrVision(employee.dentalPlan.id, employee.status);
        totalCost = totalCost + dentalCost;
      }
      if (typeof employee.visionPlan !== 'undefined' && employee.visionPlan != null && employee.visionPlan.id > 0) {
        let visionCost = this.getUnitBenefitCostForDentalOrVision(employee.visionPlan.id, employee.status);
        totalCost = totalCost + visionCost;
      }
    }

    console.log('benefit total cost(employee): ' + totalCost);
    return totalCost;
  }

  private getBenefitCostForDependents(employee: Employee): number {
    console.log('getBenefitCostForDependents() called');
    let dependents = employee.dependents;
    let totalCost = 0;

    dependents.forEach(dependent => {
      console.log('dependent: ' + JSON.stringify(dependent));

      if (typeof dependent.birthday !== 'undefined' && dependent.birthday != null ) {
        let age = this.getAge(dependent.birthday.toString());
        if (typeof dependent.medicalPlanFlag !== 'undefined' && dependent.medicalPlanFlag != null 
            && dependent.medicalPlanFlag && employee.medicalPlan != null) {
          let medicalCost = this.getUnitBenefitCostForMedical(employee.medicalPlan.id, age);
          totalCost = totalCost + medicalCost;
        }
      }
    });
    
    console.log('benefit total cost(dependents): ' + totalCost);
    return totalCost ;
  }

  private getUnitBenefitCostForMedical(planId: number, age: number): number {
    let benefitCost = 0;
    if (this.allPlanCosts
          .filter(pc => pc.planId == planId)
          .filter(pc => age >= pc.minAge && age <= pc.maxAge)[0] != null) {
    
      benefitCost = this.allPlanCosts
          .filter(pc => pc.planId == planId)
          .filter(pc => age >= pc.minAge && age <= pc.maxAge)[0].cost;
    }

    console.log('Benefit Cost(' + planId + '-' + age + '):' + benefitCost);
    return benefitCost;
  }

  private getUnitBenefitCostForDentalOrVision(planId: number, status: string): number {
    let benefitCost = 0;
    if (this.allPlanCosts
          .filter(pc => pc.planId == planId)
          .filter(pc => pc.type == status)[0] != null) {
    
      benefitCost = this.allPlanCosts
          .filter(pc => pc.planId == planId)
          .filter(pc => pc.type == status)[0].cost;
    }

    console.log('Benefit Cost(' + planId + '-' + status + '):' + benefitCost);
    return benefitCost;
  }

  private getEmployerContribution(employee: Employee): number {
    console.log('getEmployerContribution() called');
    console.log('employee: ' + JSON.stringify(employee));
    let totalComp = 0;

    if (typeof employee.startDate !== 'undefined' && employee.startDate != null ) {
      let serviceYear = this.getServiceYear(employee.startDate.toString());
      if (typeof employee.medicalPlan !== 'undefined' && employee.medicalPlan != null && employee.medicalPlan.id > 0) {
        let medicalComp = this.getUnitEmployerContribution('M', employee.status, serviceYear);
        totalComp = totalComp + medicalComp;
      }
      if (typeof employee.dentalPlan !== 'undefined' && employee.dentalPlan != null && employee.dentalPlan.id > 0) {
        let dentalComp = this.getUnitEmployerContribution('D', employee.status, serviceYear);
        totalComp = totalComp + dentalComp;
      }
      /*
      if (typeof employee.visionPlan !== 'undefined' && employee.visionPlan != null && employee.visionPlan.id > 0) {
        let visionComp = this.getUnitEmployerContribution('V', employee.status, serviceYear);
        totalComp = totalComp + visionComp;
      } */
    }

    console.log('total comp: ' + totalComp);
    return totalComp ;    
  }

  private getUnitEmployerContribution(planType: string, coverageType: string, serviceYear: number): number {
    let employerComp = 0;
    if (this.allEmployerContributions
                .filter(ec => ec.planType == 'D')
                .filter(ec => ec.coverageType == coverageType)
                .filter(ec => serviceYear == ec.serviceYear)[0] != null) {
    
      employerComp = this.allEmployerContributions
                .filter(ec => ec.planType == 'D')
                .filter(ec => ec.coverageType == coverageType)
                .filter(ec => serviceYear == ec.serviceYear)[0].amount;
    }

    console.log('employer comp(' + planType + '-' + coverageType + '-' + serviceYear + '):' + employerComp);
    return employerComp;
  }

  private getAge(birthdateString: string): number {
    birthdateString = this.setCutOffDate(birthdateString);
    var today = new Date();
    var birthDate = new Date(birthdateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) 
    {
        age--;
    }
    console.log('birthdateString is: ' + birthdateString);
    console.log('Age is: ' + age);
    return age;
  }

  private setCutOffDate(birthdateString: string): string {
    let newDateString = birthdateString.substr(0, 5) + '09-01';
    return newDateString;
  }

  private getServiceYear(startDateString: string): number {
      var today = new Date();
      var startDate = new Date(startDateString);
      var serviceYear = today.getFullYear() - startDate.getFullYear();
      var m = today.getMonth() - startDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < startDate.getDate())) 
      {
          serviceYear--;
      }
      console.log('startDateString is: ' + startDateString);
      console.log('serviceYear is: ' + serviceYear);
      return serviceYear;
  }
}
