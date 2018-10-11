import {Component, OnInit} from '@angular/core';
import {Observable}     from 'rxjs/Rx';
import { Router } from '@angular/router';
import {Validators} from '@angular/forms';
import {BenefitDiffReportService } from './benefit-diff-report.service';
import {BaseComponent }  from '../shared/base.component';
import {BenefitReport }  from '../shared/benefit-report';
import {BenefitDiffReport }  from '../shared/benefit-diff-report';

@Component({
  selector: 'app-benefit-diff-report',
  templateUrl: './benefit-diff-report.component.html',
  providers: [BenefitDiffReportService]
})

export class BenefitDiffReportComponent extends BaseComponent implements OnInit {
  benefitReportsNew: Array<BenefitReport>;
  benefitReportsOld: Array<BenefitReport>;

  benefitDiffReports: Array<BenefitDiffReport>;
  
  errorMessage: string;
  showError: boolean;  
  
  constructor(private benefitDiffReportService: BenefitDiffReportService, private router1: Router) {
    super(benefitDiffReportService, router1);    
  }

  ngOnInit(): void {
    console.log('ngOnInit() called'); 
    var today = new Date();  
    let yearMonth = today.toISOString().substr(0, 7);
    let yearMonthPre = today.toISOString().substr(0, 6) + today.getMonth().toString();
    console.log('yearMonth: ' + yearMonth); 
    console.log('yearMonthPre: ' + yearMonthPre); 
    //console.log('today.getMonth(): ' + today.getMonth()); 

    this.benefitDiffReportService.getLastBenefitReportByYearMonth(yearMonth).subscribe(
                                  testData => this.printData(testData), 
                                  error =>  this.printError(<any>error));  

    this.benefitDiffReportService.getLastBenefitReportByYearMonth(yearMonthPre).subscribe(
                                  testData => this.printPreData(testData), 
                                  error =>  this.printError(<any>error));                                    
  }

  private printData(testData):void { 
    console.log('printData() called');
    if (this.benefitReportsNew == null) { 
      this.benefitReportsNew = [];  
      this.benefitReportsNew = this.benefitReportsNew.concat(testData);
    }
    
    this.calculateDiff();
  }

  private printPreData(testData):void { 
    console.log('printPreData() called');
    if (this.benefitReportsOld == null) {
      this.benefitReportsOld = [];   
      this.benefitReportsOld = this.benefitReportsOld.concat(testData);
    }

    this.calculateDiff();
  }

  private calculateDiff(): void { 
    console.log('calculateDiff() called');
    if (this.benefitReportsNew != null && this.benefitReportsOld != null) {
      this.benefitDiffReports = [];   
      this.benefitReportsNew.forEach(br => {
        let benefitDiffReport = new BenefitDiffReport(br);
        let beneiftReportsOld = this.benefitReportsOld.filter(bro => bro.employee.login == br.employee.login);
        //console.log('beneiftReportsOld:' + JSON.stringify(beneiftReportsOld));
        //console.log('br:' + JSON.stringify(br));
        if (beneiftReportsOld[0] != null) {
          benefitDiffReport.costDiff = br.finalCost - beneiftReportsOld[0].finalCost;
        }
        else {
          benefitDiffReport.costDiff = br.finalCost;
        }
        
        this.benefitDiffReports.push(benefitDiffReport);
        //console.log('benefitDiffReport:' + JSON.stringify(benefitDiffReport));
        //console.log('this.benefitDiffReports:' + JSON.stringify(this.benefitDiffReports));
      })
    }
    else {
      console.log('Need both benefitReportsNew and benefitReportsOld!!!');
    }
  }
}
