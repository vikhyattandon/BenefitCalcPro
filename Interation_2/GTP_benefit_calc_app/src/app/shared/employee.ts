import {Dependent }  from '../shared/dependent';
import {BenefitPlan }  from '../shared/benefit-plan';
import {EmployerContribution }  from '../shared/employer-contribution';

export interface Employee {
    id:number, 
    firstName:string, 
    lastName:string,
    status:string,
    login:string,
    email:string,
    birthday:Date,
    startDate:Date,
    medicalPlan:BenefitPlan,
    dentalPlan:BenefitPlan,
    visionPlan:BenefitPlan,
    medicalContribution:EmployerContribution,
    dentalContribution:EmployerContribution,
    visionContribution:EmployerContribution,
    dependents: Array<Dependent>,
    createTs:number,
    createTsStr:string               
}