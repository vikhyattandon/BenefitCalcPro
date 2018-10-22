import {Employee }  from '../shared/employee';

export class BenefitReport {
    employee:Employee; 
    yearMonth: string;
    benefitCost:number; 
    employerContribution:number;
    finalCost:number;
    reportNumber: number;
    //costDiff:number;
    createTs:number;    
    createTsStr:string;

    constructor(employee:Employee, yearMonth: string, benefitCost:number, employerContribution:number, finalCost:number, reportNumber: number) {
        this.employee = employee;
        this.yearMonth = yearMonth;
        this.benefitCost = benefitCost;
        this.employerContribution = employerContribution;
        this.finalCost = finalCost;
        //this.costDiff = costDiff;
    }              
}