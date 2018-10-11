import { Injectable }     from '@angular/core';
import { Http, Response, Headers   } from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import { Employee }  from '../shared/Employee';
import { EmployerContribution }  from '../shared/employer-contribution';
import { BenefitPlan }  from '../shared/benefit-plan';
import { BaseService }  from '../shared/base.service';

@Injectable()
export class EmployeeSearchService extends BaseService {
      findEmployeesByName (firstName: string, lastName: String):  Observable<Array<Employee>> {
        
        let path = 'http://localhost:8080/rest/employees/findEmployeeListByFirstNameAndLastName?firstName=' + firstName +
                              '&lastName=' + lastName;
        console.log('path: ' + path);                              
        let employees = this.getHttp().get(path, {headers: this.getHeaders()})
                        .map(this.extractData).catch(this.handleError);
        return employees;
      }

/*
      getAllBenefitPlanList():  Observable<Array<BenefitPlan>> {
        
        let path = 'http://localhost:8080/rest/benefitPlans';  // URL to web API
        let benefitPlans = this.http.get(path, {headers: this.getHeaders()})
                        .map(this.extractData).catch(this.handleError);
        return benefitPlans;
      }

      getAllEmployerContributions():  Observable<Array<EmployerContribution>> {
        
        let path = 'http://localhost:8080/rest/employerContributions';  // URL to web API
        let employerContributions = this.http.get(path, {headers: this.getHeaders()})
                        .map(this.extractData).catch(this.handleError);
        return employerContributions;
      }

      private extractData(res: Response) {
        let body = res.json();  
        console.log('extractData() called');
        return body || { };
      }
      
      private handleError (error: Response | any) {
        // In a real world app, we might use a remote logging infrastructure
        let errMsg: string;
        if (error instanceof Response) {
          const body = error.json() || '';
          const err = body.error || JSON.stringify(body);
          errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
          errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return Observable.throw(errMsg);
   
      }

      private getHeaders(){
        let headers = new Headers();
        headers.append('Accept', 'application/json');
        return headers;
      }
      */
}