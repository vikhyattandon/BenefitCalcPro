import { Injectable }     from '@angular/core';
import { Http, Response, Headers, RequestOptions  } from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import { Employee }  from '../shared/employee';
import { BenefitReport }  from '../shared/benefit-report';
import { BaseService }  from '../shared/base.service';

@Injectable()
export class BenefitReportService extends BaseService {
      findActiveEmployees():  Observable<Array<Employee>> {
        
        let path = 'http://localhost:8080/rest/employees';
        console.log('path: ' + path);   
                                   
        let employees = this.getHttp().get(path, {headers: this.getHeaders()})
                        .map(this.extractData).catch(this.handleError);
        return employees;
      }

      saveBenefitReport (benefitReport: BenefitReport) {
        
        let path = 'http://localhost:8080/rest/benefitReports';  // URL to web API

        let bodyString = JSON.stringify(benefitReport); // Stringify payload
        let headers      = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
        let options       = new RequestOptions({ headers: headers }); // Create a request option
        console.log(JSON.stringify(benefitReport));

        this.getHttp().post(path, bodyString, options)
                  .map(res => res.json())
                  .catch(this.handleError)
                  .subscribe();  
        return;  
      }
}