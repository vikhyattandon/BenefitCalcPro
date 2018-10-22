import {BenefitReport }  from '../shared/benefit-report';

export class BenefitDiffReport {
    benefitReport:BenefitReport; 
    costDiff:number;
    createTsStr:string;      

    constructor(benefitReport:BenefitReport) {
        this.benefitReport = benefitReport
    }        
}